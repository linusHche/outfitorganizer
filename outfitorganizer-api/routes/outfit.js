const express = require('express');
const router = express.Router();
const Knex = require('knex');
/**
 *
 * @param {Knex} pg
 */
function outfit(pg) {
	router.get('/', async (req, res) => {
		const currentUser = req.decoded;
		const outfits = await pg('outfit').select('*').where('userid', currentUser.id);
		const outfitIds = outfits.map((outfit) => outfit.id);
		const combinations = await pg('combination')
			.select('*')
			.whereIn('outfitid', outfitIds);
		outfits.forEach((outfit) => {
			outfit.clothesIds = combinations
				.filter((combination) => combination.outfitid === outfit.id)
				.map((filteredCombination) => filteredCombination.clothesid);
			return outfit;
		});
		return res.json({ outfits });
	});

	router.post('/', async (req, res) => {
		const currentUser = req.decoded;
		const { name, description, combinations } = req.body;
		await pg.transaction(async (trx) => {
			const ids = await trx('outfit').insert(
				{ name, userid: currentUser.id, description },
				'id'
			);

			combinations.forEach((combination) => {
				combination.outfitid = ids[0];
			});
			await trx('combination').insert(combinations);
		});
		return res.status(200).send();
	});

	router.put('/:id', async (req, res) => {
		const currentUser = req.decoded;
		const outfitId = req.params.id;
		const { name, description, combinations } = req.body;
		await pg.transaction(async (trx) => {
			await trx('combination').where('outfitid', outfitId).delete();

			await trx('outfit').where('id', outfitId).update({
				name,
				description,
			});

			combinations.forEach((combination) => {
				combination.outfitid = outfitId;
			});

			await trx('combination').insert(combinations);
		});
		return res.status(200).send();
	});

	router.delete('/:id', async (req, res) => {
		const currentUser = req.decoded;
		const outfitId = req.params.id;
		await pg.transaction(async (trx) => {
			await trx('combination').where('outfitid', outfitId).delete();
			await trx('outfit').where('id', outfitId).delete();
		});
		return res.status(200).send();
	});

	return router;
}

module.exports = outfit;
