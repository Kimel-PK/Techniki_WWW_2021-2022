const express = require ('express')
const router = express.Router ()
const { zamówienia, restauracje, zamówienie_danie, dania } = require ('../models')

// pobierz listę przyjętych zamówień danego kuriera
router.post('/kurier/przyjete', async (req, res) => {
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
	
	const listaZamówień = await zamówienia.findAll ({
		include: [
			{
				model: restauracje,
				attributes: ['nazwa'],
				as: 'restauracja'
			},
			{
				model: dania,
				attributes: ['nazwa', 'cena'],
				as: 'dania'
			}
		],
		where: {
			id_kurier: id_kurier,
			status: 'w trakcie'
		}
	});
	
	res.json(listaZamówień)
})

// pobierz listę zrealizowanych zamówień danego kuriera
router.post('/kurier/zrealizowane', async (req, res) => {
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
	
	const listaZamówień = await zamówienia.findAll ({
		include: [
			{
				model: restauracje,
				attributes: ['nazwa'],
				as: 'restauracja'
			},
			{
				model: dania,
				attributes: ['nazwa', 'cena'],
				as: 'dania'
			}
		],
		where: {
			id_kurier: id_kurier,
			status: 'zrealizowane'
		}
	});
	
	res.json(listaZamówień)
})

// pobierz listę zamówień dostępnych do przyjęcia
router.post('/dostepne', async (req, res) => {
	
	const { token } = req.body
	
	if (token != 'super_tajne_kurierskie_hasło') {
		res.json ({
			error: 'Te dane dostępne są jedynie dla kurierów!'
		})
		return
	}
	
	const listaZamówień = await zamówienia.findAll ({
		include: [
			{
				model: restauracje,
				attributes: ['nazwa'],
				as: 'restauracja'
			},
			{
				model: dania,
				attributes: ['nazwa', 'cena'],
				as: 'dania'
			}
		],
		where: {
			status: 'złożone'
		}
	});
	
	res.json(listaZamówień)
})

// sprawdź status zamówienia
router.get('/status/:kod', async (req, res) => {
	const kod = req.params.kod
	const zamówienie = await zamówienia.findAll({
		include: [
			{
				model: restauracje,
				attributes: ['nazwa'],
				as: 'restauracja'
			},
			{
				model: dania,
				attributes: ['nazwa', 'cena'],
				as: 'dania'
			}
		],
		where: {
			kod: kod
		}
	})
	res.json (zamówienie)
})

// anuluj zamówienie jeśli jeszcze nie zostało podjęte
router.get('/anuluj/:kod', async (req, res) => {
	const kod = req.params.kod
	const zamówienie = await zamówienia.findOne({
		where: {
			kod: kod
		}
	})
	
	if (!zamówienie) {
		res.json ({
			error: 'Zamówienie ne istnieje'
		})
		return
	}
	
	if (zamówienie.status === 'złożone') {
		
		await zamówienia.update(
			{
				status: 'anulowane'
			},
			{
				where: {
					id: zamówienie.id
				}
			}
		)
		
		res.json ({
			message: 'Zamówienie #' + zamówienie.id + ' zostało anulowane'
		})
	} else {
		res.json ({
			message: 'Zamówienie #' + zamówienie.id + ' nie może zostać anulowane'
		})
	}
	
})

// złóż nowe zamówienie
router.post('/nowe', async (req, res) => {
	const zamówienie_dane = req.body
	
	// odczytaj z zamówienia dane podstawowe
	const zamówienie = {
		miasto: zamówienie_dane.miasto,
		ulica: zamówienie_dane.ulica,
		numer_mieszkania: zamówienie_dane.numer_mieszkania,
		cena: zamówienie_dane.cena,
		kod: zamówienie_dane.kod,
		id_restauracja: zamówienie_dane.id_restauracja,
		status: 'złożone'
	}
	
	const zamówienie_res = await zamówienia.create(zamówienie)
	
	// odczytaj z zamówienia listę dań
	for (const [key, value] of Object.entries(zamówienie_dane.dania)) {
		zamówienie_danie_dane = {
			ilość: value.ilość,
			id_danie: value.id_danie,
			id_zamówienie: zamówienie_res.id,
			kod: zamówienie_dane.kod,
		}
		await zamówienie_danie.create(zamówienie_danie_dane)
	}
	
	res.json({
		message: 'Pomyślnie złożono zamówienie'
	})
})

module.exports = router