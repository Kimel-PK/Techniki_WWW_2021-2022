const express = require ('express')
const router = express.Router ()
const { menu, dania } = require ('../models')

router.get('/restauracja/:id_restauracja', async (req, res) => {
	const id_restauracja = req.params.id_restauracja
	const listaDań = await menu.findAll({
		include: [{
			model: dania,
			attributes: ['nazwa', 'cena'],
			as: 'danie'
		}],
		order: [
			['kolejność', 'ASC'],
		],
		where: {
			id_restauracja: id_restauracja
		}
	})
	res.json(listaDań);
})

module.exports = router