const express = require ('express')
const router = express.Router ()
const { zamówienia, restauracje, zamówienie_danie } = require ('../models')

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
		include: [{
			model: restauracje,
			attributes: ['nazwa'],
			as: 'restauracja'
		}],
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
		include: [{
			model: restauracje,
			attributes: ['nazwa'],
			as: 'restauracja'
		}],
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
			}
		],
		where: {
			status: 'złożone'
		}
	});
	
	res.json(listaZamówień)
})

// złóż nowe zamówienie
router.post('/nowe', async (req, res) => {
	const zamówienie = req.body
	await zamówienia.create(zamówienie)
	res.json(zamówienie)
})

module.exports = router