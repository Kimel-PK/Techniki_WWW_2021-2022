import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Kurier() {
	
	const navigate = useNavigate()
	
	// !! to się chyba da zrobić inaczej
	
	const [czas, ustawCzas] = useState([])
	
	const id_kuriera = window.sessionStorage.getItem('zalogowany');
	const [kurier, pobierzDaneKuriera] = useState([])
	const [listaZamówień, pobierzDostępneZamówienia] = useState([])
	const [listaPodjętychZamówień, pobierzPodjęteZamówienia] = useState([])
	const [listaZrealizowanychZamówień, pobierzZrealizowaneZamówienia] = useState([])
	
	useEffect (() => {
		
		// odświeżanie co sekunde
		let interval = null;
		interval = setInterval(() => {
			ustawCzas(czas => czas + 1);
		}, 1000);
		
		// pobieranie danych o zamówieniach
		const dane = {
			token: 'super_tajne_kurierskie_hasło',
			id_kurier: id_kuriera
		}
		
		axios.post(`http://localhost:3001/kurier`, dane).then((response) => {
			pobierzDaneKuriera(response.data)
		})
		
		axios.post(`http://localhost:3001/zamowienia/dostepne`, dane).then((response) => {
			pobierzDostępneZamówienia(response.data)
		})
		
		axios.post(`http://localhost:3001/zamowienia/kurier/przyjete`, dane).then((response) => {
			pobierzPodjęteZamówienia(response.data)
		})
		
		axios.post(`http://localhost:3001/zamowienia/kurier/zrealizowane`, dane).then((response) => {
			pobierzZrealizowaneZamówienia(response.data)
		})
		
		return () => clearInterval(interval);
	}, [czas, id_kuriera])
	
	function podejmijZamówienie (id) {
		console.log('podejmij zamówienie o id ' + id)
		
		const dane = {
			token: 'super_tajne_kurierskie_hasło',
			id_kurier: id_kuriera,
			id_zamówienie: id
		}
		
		axios.post(`http://localhost:3001/kurier/podejmij`, dane).then((response) => {})
		
		// !! narysuj komponent od nowa
	}
	
	function zrealizujZamówienie (id) {
		console.log('zrealizuj zamówienie o id ' + id)
		
		const dane = {
			token: 'super_tajne_kurierskie_hasło',
			id_kurier: id_kuriera,
			id_zamówienie: id
		}
		
		axios.post(`http://localhost:3001/kurier/zrealizuj`, dane).then((response) => {})
		
		// !! narysuj komponent od nowa
	}
	
	return (
		<main>
			<Container>
				<Row>
					<div className='duzy-przycisk'>
						<p onClick={() => {
							window.sessionStorage.removeItem('zalogowany')
							navigate('/')
						}}>Wyloguj się</p>
					</div>
				</Row>
				<Row>
					<h1 className='text-center'>Kurier</h1>
					<p className='text-center'>#{id_kuriera} {kurier.imię} {kurier.nazwisko}</p>
				</Row>
				<hr></hr>
				<Row>
					<Col md='6'>
						<h2>Dostępne zamówienia</h2>
						<div className='zamowienia'>
							{listaZamówień.map((zamówienie, key) => {
								return (
									<div key={ key } className='zamowienie'>
										<div className='zamowienie-naglowek'>
											<Row>
												<Col md='6'>
													<h3>#{zamówienie.id}</h3>
												</Col>
												<Col md='6'>
													<h3 className='text-right'>{zamówienie.cena} zł</h3>
												</Col>
											</Row>
										</div>
										<div className='zamowienie-tresc zamowienie-dostepne'>
											<p>Do odbioru z restauracji: {zamówienie.restauracja.nazwa}</p>
											<p>Na adres: {zamówienie.adres}</p>
											<p>Zamówienie:</p>
											<ul>
												{ zamówienie.dania.map ((danie, danie_key) => {
													return (
														<li key={ danie_key }>{danie.nazwa} - {danie.cena} zł</li>
													)
												})}
											</ul>
											<div className='przycisk'>
												<button onClick={ () => {
													podejmijZamówienie(zamówienie.id)
												}}>Podejmij</button>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</Col>
					<Col md='6'>
						<h2>Podjęte zamówienia</h2>
						<div className='zamowienia'>
							{listaPodjętychZamówień.map((zamówienie, key) => {
								return (
									<div key={ key } className='zamowienie'>
										<div className='zamowienie-naglowek'>
											<Row>
												<Col md='6'>
													<h3>#{zamówienie.id}</h3>
												</Col>
												<Col md='6'>
													<h3 className='text-right'>{zamówienie.cena} zł</h3>
												</Col>
											</Row>
										</div>
										<div key={ key } className='zamowienie-tresc zamowienie-dostepne'>
											<p>Do odbioru z restauracji: {zamówienie.restauracja.nazwa}</p>
											<p>Na adres: {zamówienie.adres}</p>
											<p>Zamówienie:</p>
											<ul>
												{ zamówienie.dania.map ((danie, danie_key) => {
													return (
														<li key={ danie_key }>{danie.nazwa} - {danie.cena} zł</li>
													)
												})}
											</ul>
											<div className='przycisk'>
												<button onClick={ () => {
													zrealizujZamówienie(zamówienie.id)
												}}>Oznacz jako zrealizowane</button>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</Col>
				</Row>
				<hr></hr>
				<Row>
					<h2>Zamówienia zrealizowane</h2>
					<div className='zamowienia'>
						{listaZrealizowanychZamówień.map((zamówienie, key) => {
							return (
								<div key={ key } className='zamowienie'>
									<div className='zamowienie-naglowek'>
										<Row>
											<Col md='6'>
												<h3>#{zamówienie.id}</h3>
											</Col>
											<Col md='6'>
												<h3 className='text-right'>{zamówienie.cena} zł</h3>
											</Col>
										</Row>
									</div>
									<div key={ key } className='zamowienie-tresc zamowienie-dostepne'>
										<p>Odebrano z restauracji: {zamówienie.restauracja.nazwa}</p>
										<p>Dostarczono na adres: {zamówienie.adres}</p>
										<p>Zamówienie:</p>
										<ul>
											{ zamówienie.dania.map ((danie, danie_key) => {
												return (
													<li key={ danie_key }>{danie.nazwa} - {danie.cena} zł</li>
												)
											})}
										</ul>
									</div>
								</div>
							)
						})}
					</div>
				</Row>
			</Container>
		</main>
	)
}

export default Kurier
