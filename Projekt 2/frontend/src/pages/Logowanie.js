import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Logowanie() {
	
	let navigate = useNavigate()
	
	const initialValues = {
		email: "",
		hasło: ""
	}
	
	const onSubmit = (dane_logowania) => {
		
		axios.post('http://localhost:3001/auth', dane_logowania).then((response) => {
			if (!response.data.error) {
				
				// informacja o zalogowanym użytkowniku przechowywana jest w sesji
				window.sessionStorage.setItem('zalogowany', response.data.user_id)
				
				navigate('/kurier')
			}
		})
		
	}
	
	const validationSchema = Yup.object().shape({
		email: Yup.string().email("Niepoprawny email").required("Pole email nie może być puste!"),
		hasło: Yup.string().required("Pole hasło nie może być puste!")
	})
	
	return (
		<main>
			<Container className='wrapper-login'>
				<div className='do-strony-glownej'>
					<p onClick={() => {navigate('/')}}>Powrót do strony głównej</p>
				</div>
				<Row>
					<h2>Panel logowania</h2>
				</Row>
				<Row>
					<Formik
						initialValues={ initialValues }
						onSubmit={ onSubmit }
						validationSchema={ validationSchema }
					>
						<Form>
							<label>Email:</label>
							<ErrorMessage name='email' component='span' />
							<Field id='inputMail' name='email' placeholder='example@example.com'></Field>
							<label>Hasło:</label>
							<ErrorMessage name='hasło' component='span' />
							<Field id='inputHasło' name='hasło' type='password' placeholder='********'></Field>
							<button type='submit' className='button-login-submit'>Zaloguj</button>
						</Form>
					</Formik>
				</Row>
			</Container>
		</main>
	)
}

export default Logowanie
