import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

function Restauracja() {
	
	const navigate = useNavigate()
	const [restauracja, pobierzRestauracje] = useState([])
	
	// id restauracji pobrane z linku
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
	}, [id])
	
	// Formik - ustawienia formularza zamówienia
	
	const initialValues = {
		miasto: "",
		ulica: "",
		numer_mieszkania: ""
	}
	
	const validationSchema = Yup.object().shape({
		miasto: Yup.string().required("Pole miasto nie może być puste!"),
		ulica: Yup.string().required("Pole ulica nie może być puste!"),
		numer_mieszkania: Yup.string().required("Pole numer domu/mieszkania nie może być puste!"),
	})
	
	const onSubmit = (data) => {
		
		// wygeneruj kod (hasło do) zamówienia
		const kod = Date.now().toString() + (Math.floor(Math.random() * (999 - 100)) + 100).toString()
		
		let zamówienie_dane = {
			miasto: data.miasto,
			ulica: data.ulica,
			numer_mieszkania: data.numer_mieszkania,
			cena: kwota,
			kod: kod,
			id_restauracja: id,
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
				<div className='duzy-przycisk'>
					<p onClick={() => {navigate('/')}}>Powrót do strony głównej</p>
				</div>
				{/* z niewyjaśnionych przyczyn nie mam dostępu do obiektów wewnętrznych chyba że potraktuje jeden rekord jako listę */}
				{restauracja.map((restauracja_dane, key) => {
					return (
						<div key={ key } className='restauracja-info'>
							<Row>
								<h2 className='text-center'>{restauracja_dane.nazwa}</h2>
							</Row>
							<hr></hr>
							<Row>
								<Col md='6'>
									<img src={restauracja_dane.zdjęcie} alt='Zdjęcie restauracji' />
								</Col>
								<Col md='6'>
									<h3>Opis</h3>
									<p>{restauracja_dane.opis}</p>
									<h3>Adres</h3>
									<p>{restauracja_dane.miasto}<br></br>{restauracja_dane.ulica} {restauracja_dane.numer_lokalu}</p>
									<p>{restauracja_dane.kod_pocztowy} {restauracja_dane.miasto_poczta}</p>
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
										{restauracja_dane.dania.map((danie, key) => {
											
											ceny[danie.id] = danie.cena
											
											return (
												<tr key={ key }>
													<td>{danie.nazwa}</td>
													<td>{danie.cena} zł</td>
													<td className='zamówienie-ilość'>
														<button onClick={ () => {
															odejmijOdZamówienia (danie.id)
														}}>-</button>
														<p id={ `danie-${danie.id}` }>0</p>
														<button onClick={ () => {
															dodajDoZamówienia (danie.id)
														}}>+</button>
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</Row>
						</div>
					)
				})}
				<hr></hr>
				<Formik
					initialValues={ initialValues }
					onSubmit={ onSubmit }
					validationSchema={ validationSchema }
					>
					<Form>
						<Row>
							<Col md='6'>
								<h3>Łączna kwota zamówienia:</h3>
								<p id='zamówienie-kwota'>0.00 zł</p>
							</Col>
							<Col md='6'>
								<h3>Adres dostawy:</h3>
										<label>Miasto:</label>
										<ErrorMessage name='miasto' component='span' />
										<Field id='inputMiasto' name='miasto' placeholder=''></Field>
										<label>Ulica:</label>
										<ErrorMessage name='ulica' component='span' />
										<Field id='inputUlica' name='ulica' placeholder=''></Field>
										<label>Numer domu/mieszkania:</label>
										<ErrorMessage name='numer_mieszkania' component='span' />
										<Field id='inputNumerMieszkania' name='numer_mieszkania' placeholder=''></Field>
							</Col>
						</Row>
						<hr></hr>
						<Row>
							<div className='duzy-przycisk'>
								<button type='submit'>Złóż zamówienie</button>
							</div>
						</Row>
					</Form>
				</Formik>
			</Container>
		</main>
	)
}

export default Restauracja
