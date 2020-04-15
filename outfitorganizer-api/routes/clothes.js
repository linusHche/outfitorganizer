const express = require('express');
const router = express.Router();

module.exports = (pg, dbx) => {
	router.get('/', async (req, res) => {
		const currentUser = req.decoded;
		try {
			const clothes = await pg('clothes').select('id', 'name', 'description', 'path').where('userid', currentUser.id);
			return res.json({ clothes });
		} catch (err) {
			console.error(err);
			return res.status(500).json('Something went wrong, please try again');
		}
	});

	router.post('/', async (req, res) => {
		const currentUser = req.decoded;
		const { name, description, path } = req.body;
		const contents = Buffer.from(path, 'base64');
		const pictureName = name.replace(' ', '');
		const uploadPath = `/${currentUser.name}/${pictureName}.jpg`;
		try {
			await dbx.filesUpload({ path: uploadPath, contents });
			let imageUrl = (await dbx.sharingCreateSharedLinkWithSettings({ path: uploadPath })).url;
			imageUrl = imageUrl.slice(0, imageUrl.length - 4) + 'raw=1';
			await pg
				.insert({
					userid: currentUser.id,
					name,
					description,
					path: imageUrl,
				})
				.table('clothes');
			return res.status(200).json({ path: imageUrl });
		} catch (err) {
			console.error(err);
			if (err.status === 409) return res.status(409).json({ msg: 'Clothes with this name already exist' });
			return res.status(500).json({ msg: 'Something went wrong, please try again' });
		}
	});

	router.put('/:id', async (req, res) => {
		const currentUser = req.decoded;
		const { previousName, name, description } = req.body;
		try {
			if (previousName !== name)
				await dbx.filesMove({
					from_path: `/${currentUser.name}/${previousName.replace(' ', '')}.jpg`,
					to_path: `/${currentUser.name}/${name.replace(' ', '')}.jpg`,
				});
			await pg('clothes').where('id', req.params.id).update({
				name,
				description,
			});
			return res.status(200).send();
		} catch (err) {
			if (err.status === 409) return res.status(409).json({ msg: 'Clothes with this name already exist' });
			console.error(err);
		}
	});

	router.delete('/:id', async (req, res) => {
		const currentUser = req.decoded;
		try {
			const deletedClothes = await pg('clothes').where('id', req.params.id).delete().returning('*');
			await dbx.filesDelete({ path: `/${currentUser.name}/${deletedClothes[0].name.replace(' ', '')}.jpg` });
			return res.status(200).send();
		} catch (err) {
			console.error(err);
		}
	});

	return router;
};
