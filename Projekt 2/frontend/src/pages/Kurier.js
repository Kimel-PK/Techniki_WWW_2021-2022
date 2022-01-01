import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Kurier() {
	
	const navigate = useNavigate()
	
	const id_kuriera = window.sessionStorage.getItem('zalogowany');
	const [kurier, pobierzDaneKuriera] = useState([])
	const [listaZamówień, pobierzDostępneZamówienia] = useState([])
	const [listaPodjętychZamówień, pobierzPodjęteZamówienia] = useState([])
	const [listaZrealizowanychZamówień, pobierzZrealizowaneZamówienia] = useState([])
	
	useEffect (
		() => {
			
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
			
		}, [id_kuriera]
	)
	
	function podejmijZamówienie (id) {
		console.log('podejmij zamówienie o id ' + id)
	}
	
	function zrealizujZamówienie (id) {
		console.log('zrealizuj zamówienie o id ' + id)
	}
	
	return (
		<main>
			<Container>
				<Row>
					<div className='do-strony-glownej'>
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
							{listaZamówień.map((value, key) => {
								return (
									<div key={ key } className='zamowienie'>
										<div className='zamowienie-naglowek'>
											<Row>
												<Col md='6'>
													<h3>#{value.id}</h3>
												</Col>
												<Col md='6'>
													<h3 className='text-right'>{value.cena} zł</h3>
												</Col>
											</Row>
										</div>
										<div className='zamowienie-tresc zamowienie-dostepne'>
											<p>Do odbioru z restauracji: {value.restauracja.nazwa}</p>
											<p>Na adres: {value.adres}</p>
											<p>Zamówienie:</p>
											<ul>
												<li></li>
											</ul>
											<div className='przycisk'>
												<button onClick={ () => {
													podejmijZamówienie(value.id)
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
							{listaPodjętychZamówień.map((value, key) => {
								return (
									<div key={ key } className='zamowienie'>
										<div className='zamowienie-naglowek'>
											<Row>
												<Col md='6'>
													<h3>#{value.id}</h3>
												</Col>
												<Col md='6'>
													<h3 className='text-right'>{value.cena} zł</h3>
												</Col>
											</Row>
										</div>
										<div key={ key } className='zamowienie-tresc zamowienie-dostepne'>
											<p>Do odbioru z restauracji: {value.restauracja.nazwa}</p>
											<p>Na adres: {value.adres}</p>
											<p>Zamówienie:</p>
											<ul>
												<li></li>
											</ul>
											<div className='przycisk'>
												<button onClick={ () => {
													zrealizujZamówienie(value.id)
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
						{listaZrealizowanychZamówień.map((value, key) => {
							return (
								<div key={ key } className='zamowienie'>
									<div className='zamowienie-naglowek'>
										<Row>
											<Col md='6'>
												<h3>#{value.id}</h3>
											</Col>
											<Col md='6'>
												<h3 className='text-right'>{value.cena} zł</h3>
											</Col>
										</Row>
									</div>
									<div key={ key } className='zamowienie-tresc zamowienie-dostepne'>
										<p>Odebrano z restauracji: {value.restauracja.nazwa}</p>
										<p>Dostarczono na adres: {value.adres}</p>
										<p>Zamówienie:</p>
										<ul>
											<li></li>
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
