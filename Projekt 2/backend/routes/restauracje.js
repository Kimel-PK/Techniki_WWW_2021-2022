const express = require ('express')
const router = express.Router ()
const { restauracje } = require ('../models')

router.get('/', async (req, res) => {
	// pobierz listę restauracji w jakich można złożyć zamówienie
	const listaRestauracji = await restauracje.findAll ();
	res.json(listaRestauracji)
})

router.get('/id/:id', async (req, res) => {
	const id = req.params.id
	const restauracja = await restauracje.findByPk(id)
	res.json(restauracja);
})

router.post('/', async (req, res) => {
	// twórz nowy wpis restauracji
	const restauracja = req.body
	await restauracje.create(restauracja)
	res.json(restauracja)
})

module.exports = router