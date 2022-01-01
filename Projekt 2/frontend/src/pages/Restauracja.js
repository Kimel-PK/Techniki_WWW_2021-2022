import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

function Restauracja() {
	
	let navigate = useNavigate()
	const [restauracja, pobierzRestauracje] = useState([])
	const [menu, pobierzMenu] = useState([])
	
	let { id } = useParams()
	
	useEffect (() => {
		axios.get(`http://localhost:3001/restauracje/id/${id}`).then((response) => {
			pobierzRestauracje(response.data)
		})
		axios.get(`http://localhost:3001/menu/restauracja/${id}`).then((response) => {
			pobierzMenu(response.data)
		})
	}, [id])
	
	const initialValues = {
		adres: ""
	}
	
	const validationSchema = Yup.object().shape({
		adres: Yup.string().required("Pole adres nie może być puste!")
	})
	
	const onSubmit = (data) => {
		
		let zamowienie = {
			adres: data.adres,
			cena: 10, // do obliczenia z formularza
			status: 'złożone'
		}
		
		// wstaw zamowienie
		axios.post('http://localhost:3001/zamowienia', zamowienie).then((response) => {
			console.log ("Utworzono nowe zamówienie!");
		})
		
		// wstaw liste dan
		
		navigate('/zamowienie') // przekieruj na stronę zamówienia
	}
	
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
									return (
										<tr key={ key }>
											<td>{value.danie.nazwa}</td>
											<td>{value.danie.cena} zł</td>
											<td></td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</Row>
				</div>
				<hr></hr>
				<Row>
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
				</Row>
			</Container>
		</main>
	)
}

export default Restauracja
