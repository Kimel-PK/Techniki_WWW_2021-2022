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

// podejmij się dostarczenia zamówienia
router.post('/podejmij', async (req, res) => {
	const { id_zamówienie, id_kurier, token } = req.body
	
	if (token != 'super_tajne_kurierskie_hasło') {
		res.json ({
			error: 'Te dane dostępne są jedynie dla kurierów!'
		})
		return
	}
	
	// !! sprawdź czy zamówienie nie jest odbierane innemu kurierowi
	
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
		message: 'Kurier ' + id_kurier + ' podejmuje realizację zamówienia #' + id_zamówienie
	})
})

// oznacz zamówienie jako zrealizowane
router.post('/zrealizuj', async (req, res) => {
	const { id_zamówienie, id_kurier, token } = req.body
	
	if (token != 'super_tajne_kurierskie_hasło') {
		res.json ({
			error: 'Te dane dostępne są jedynie dla kurierów!'
		})
		return
	}
	
	// !! sprawdź czy zgadza się kurier
	
	await zamówienia.update(
		{
			status: 'zrealizowane'
		},
		{
			where: {
				id: id_zamówienie
			}
		}
	)
	
	res.json ({
		message: 'Kurier ' + id_kurier + ' zrealizował zamówienie #' + id_zamówienie
	})
})

module.exports = router