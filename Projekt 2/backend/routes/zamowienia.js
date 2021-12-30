const express = require ('express')
const router = express.Router ()
const { zamówienia } = require ('../models')

router.get('/', async (req, res) => {
	// zwraca liste zamówień dostępnych do przyjęcia
	const zamówienie = await zamówienia.findAll ();
	res.json(zamówienie)
})

router.post('/', async (req, res) => {
	const zamówienie = req.body
	await zamówienia.create(zamówienie)
	res.json(zamówienie)
})

module.exports = router