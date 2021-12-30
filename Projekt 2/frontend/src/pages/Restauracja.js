import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function Restauracja() {
	
	// pobierz wszystkie dania jakie oferuje ta restauracja 
	
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
	}
	
	return (
		<div className='container'>
			<h1>Widok restauracji</h1>
			<div className='row'>
				<p>
					Opis restauracji
				</p>
				<p>
					Zdjęcie restauracji
				</p>
				<p>
					Adres restauracji
				</p>
			</div>
			<div className='row'>
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
			</div>
		</div>
	)
}

export default Restauracja
