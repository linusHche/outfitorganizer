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
		try {
			const currentUser = req.decoded;
			const { name, description, path } = req.body;
			const contents = Buffer.from(path, 'base64');
			const pictureName = name.replace(' ', '');
			const uploadPath = `/${currentUser.name}/${pictureName}.jpg`;
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
			return res.status(500).json({ msg: 'Something went wrong, please try again' });
		}
	});

	router.put('/:id', async (req, res) => {
		const currentUser = req.decoded;
		const { name, description } = req.body;
		try {
			await pg('clothes').where('id', req.params.id).update({
				name,
				description,
			});
			res.status(200).send();
		} catch (err) {
			console.error(err);
		}
	});

	return router;
};
