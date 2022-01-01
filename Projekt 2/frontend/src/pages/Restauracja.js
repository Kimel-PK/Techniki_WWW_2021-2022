import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

function Restauracja() {
	
	const navigate = useNavigate()
	const [restauracja, pobierzRestauracje] = useState([])
	const [menu, pobierzMenu] = useState([])
	
	const { id } = useParams()
	
	// obiekt przechowywujący zamówione dania
	const zamówienie = {}
	// obiekt przechowywujący ceny dań
	const ceny = {}
	// łączna kwota zamówienia
	let kwota = 0
	
	useEffect (() => {
		// pobierz informację o wybranej restauracji
		axios.get(`http://localhost:3001/restauracje/id/${id}`).then((response) => {
			pobierzRestauracje(response.data)
		})
		// pobierz menu wybranej restauracji
		axios.get(`http://localhost:3001/menu/restauracja/${id}`).then((response) => {
			pobierzMenu(response.data)
		})
	}, [id])
	
	// Formik - ustawienia formularza zamówienia
	
	const initialValues = {
		adres: ""
	}
	
	const validationSchema = Yup.object().shape({
		adres: Yup.string().required("Pole adres nie może być puste!")
	})
	
	const onSubmit = (data) => {
		
		// wygeneruj kod (hasło do) zamówienia
		const kod = Date.now().toString() + (Math.floor(Math.random() * (999 - 100)) + 100).toString()
		
		let zamówienie_dane = {
			adres: data.adres,
			cena: kwota,
			kod: kod,
			id_restauracja: restauracja.id,
			dania: {}
		}
		
		// wstaw liste dan
		for (const [key, value] of Object.entries(zamówienie)) {
			zamówienie_dane.dania[key] = {
				ilość: value,
				id_danie: key,
				kod: kod,
			}
		}
		
		// wstaw zamówienie
		axios.post('http://localhost:3001/zamowienia/nowe', zamówienie_dane).then((response) => {
			console.log ("Utworzono nowe zamówienie!");
			// zapisz w sesji kod pozwalający śledzić zamówienie
			window.sessionStorage.setItem('kod', kod)
		})
		
		navigate('/zamowienie') // przekieruj na stronę zamówienia
	}
	
	// obsługa przycisków w menu
	
	function dodajDoZamówienia (id) {
		
		if (!zamówienie[id]) {
			zamówienie[id] = 1
		} else {
			zamówienie[id] += 1
		}
		
		kwota += parseFloat (ceny[id])
		document.getElementById('danie-' + id).innerHTML = zamówienie[id];
		document.getElementById('zamówienie-kwota').innerHTML = kwota.toFixed(2) + ' zł';
	}
	
	function odejmijOdZamówienia (id) {
		
		if (zamówienie[id] === 1) {
			delete zamówienie[id]
			document.getElementById('danie-' + id).innerHTML = '0';
			kwota -= parseFloat (ceny[id])
		} else if (zamówienie[id]) {
			zamówienie[id] -= 1
			document.getElementById('danie-' + id).innerHTML = zamówienie[id];
			kwota -= parseFloat (ceny[id])
		}
		
		document.getElementById('zamówienie-kwota').innerHTML = kwota.toFixed(2) + ' zł';
	}
	
	// html
	return (
		<main>
			<Container>
				<div className='do-strony-glownej'>
					<p onClick={() => {navigate('/')}}>Powrót do strony głównej</p>
				</div>
				<div className='restauracja-info'>
					<Row>
						<h2 className='text-center'>{restauracja.nazwa}</h2>
					</Row>
					<hr></hr>
					<Row>
						<Col md='6'>
							<img src={restauracja.zdjęcie} alt='Zdjęcie restauracji' />
						</Col>
						<Col md='6'>
							<h3>Opis</h3>
							<p>{restauracja.opis}</p>
							<h3>Adres</h3>
							<p>{restauracja.miasto}</p>
							<p>{restauracja.ulica} {restauracja.numer_lokalu}</p>
						</Col>
					</Row>
					<hr></hr>
					<Row>
						<h3>Menu</h3>
						<table>
							<thead>
								<tr>
									<th>Danie</th>
									<th>Cena</th>
									<th>Zamówienie</th>
								</tr>
							</thead>
							<tbody>
								{menu.map((value, key) => {
									
									ceny[value.id_danie] = value.danie.cena
																		
									return (
										<tr key={ key }>
											<td>{value.danie.nazwa}</td>
											<td>{value.danie.cena} zł</td>
											<td className='zamówienie-ilość'>
												<button onClick={ () => {
													odejmijOdZamówienia (value.id_danie)
												}}>-</button>
												<p id={ `danie-${value.id_danie}` }>0</p>
												<button onClick={ () => {
													dodajDoZamówienia (value.id_danie)
												}}>+</button>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</Row>
				</div>
				<hr></hr>
				<Row>
					<Col md='6'>
						<Formik
							initialValues={ initialValues }
							onSubmit={ onSubmit }
							validationSchema={ validationSchema }
						>
							<Form>
								<label>Adres:</label>
								<ErrorMessage name='adres' component='span' />
								<Field id='inputAdres' name='adres' placeholder=''></Field>
								<button type='submit'>Złóż zamówienie</button>
							</Form>
						</Formik>
					</Col>
					<Col md='6'>
						<h3>Łączna kwota zamówienia:</h3>
						<p id='zamówienie-kwota'>0.00 zł</p>
					</Col>
				</Row>
			</Container>
		</main>
	)
}

export default Restauracja
