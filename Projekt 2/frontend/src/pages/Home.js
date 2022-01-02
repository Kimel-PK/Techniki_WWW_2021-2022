import React from 'react'
// uruchamia zapytania do endpointów
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

function Home() {
	
	let navigate = useNavigate()
	const [listaRestauracji, pobierzListeRestauracji] = useState([])
	
	useEffect(() => {
		axios.get('http://localhost:3001/restauracje').then((response) => {
			pobierzListeRestauracji(response.data)
		})
	}, [])
	
	return (
		<main>
			<Container>
				<Row>
					<h2 className='text-center'>Nasze lokale</h2>
				</Row>
				{listaRestauracji.map((restauracja, key) => {
					return (
						<Row key={ key } className='restauracje-karta' onClick={() => {navigate(`/restauracja/${restauracja.id}`)}}>
							<Col md='4' className='restauracje-karta-zdjecie'>
								<img src={restauracja.zdjęcie} alt='Zdjęcie restauracji' />
							</Col>
							<Col md='8'>
								<Row>
									<div className='nazwa'>
										<h3 className="text-center">{restauracja.nazwa}</h3>
									</div>
								</Row>
								<Row>
									<Col lg='8' className='restauracja-karta-info'>
										<div className='opis'>
											<p>{restauracja.opis}</p>
										</div>
									</Col>
									<Col lg='4' className='restauracja-karta-adres'>
										<h4>Lokalizacja:</h4>
										<p>{restauracja.miasto}<br></br>{restauracja.ulica} {restauracja.numer_lokalu}</p>
										<p>{restauracja.kod_pocztowy} {restauracja.miasto_poczta}</p>
									</Col>
								</Row>
							</Col>
						</Row>
					)
				})}
			</Container>
		</main>
	)
}

export default Home
