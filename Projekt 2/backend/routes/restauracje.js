const express = require ('express')
const router = express.Router ()
const { restauracje } = require ('../models')

router.get('/', async (req, res) => {
	// pobierz listę restauracji w jakich można złożyć zamówienie
	const listaRestauracji = await restauracje.findAll ();
	res.json(listaRestauracji)
})

router.post('/', async (req, res) => {
	// twórz nowy wpis restauracji
	const restauracja = req.body
	await restauracje.create(restauracja)
	res.json(restauracja)
})

module.exports = router