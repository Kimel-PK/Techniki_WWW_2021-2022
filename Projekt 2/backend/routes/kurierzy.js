const express = require ('express')
const router = express.Router ()
const { użytkownicy, zamówienia } = require ('../models')

// pobierz dane kuriera
router.post('/', async (req, res) => {
	const { id_kurier, token } = req.body
	
	if (token != 'super_tajne_kurierskie_hasło') {
		res.json ({
			error: 'Te dane dostępne są jedynie dla kurierów!'
		})
		return
	}
	
	if (!id_kurier) {
		res.json ({
			error: 'Nie podano ID kuriera'
		})
		return
	}
	
	const kurier = await użytkownicy.findOne({
		where: {
			id: id_kurier
		},
		attributes: ['imię', 'nazwisko']
	})
	res.json ({
		imię: kurier.imię,
		nazwisko: kurier.nazwisko
	})
})

router.post('/podejmij', async (req, res) => {
	const { id_zamówienie, id_kurier, token } = req.body
	
	if (token != 'super_tajne_kurierskie_hasło') {
		res.json ({
			error: 'Te dane dostępne są jedynie dla kurierów!'
		})
		return
	}
	
	await zamówienia.update(
		{
			status: 'w trakcie',
			id_kurier: id_kurier
		},
		{
			where: {
				id: id_zamówienie
			}
		}
	)
	
	res.json ({
		message: 'Kurier ' + id_kurier + ' podejmuje realizację zamówienia ' + id_zamówienie
	})
})

module.exports = router