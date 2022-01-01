import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Zamówienie() {
	
	const navigate = useNavigate()
	
	const kod = window.sessionStorage.getItem('kod');
	const [zamówienie, pobierzZamówienie] = useState([])
	
	useEffect (() => {
		
		// użytkownik w tej sesji nie zamówił niczego
		if (!kod) {
			navigate('/')
		}
		
		axios.get(`http://localhost:3001/zamowienia/status/${kod}`).then((response) => {
			pobierzZamówienie(response.data)
		})
	}, [kod, navigate])
	
	return (
		<main>
			<Container>
				<Row>
					<h1>Status zamówienia #{zamówienie.id}</h1>
				</Row>
				<Row>
					<Col md='6'>
						<h2>Zamówienie</h2>
						<ul>
							<li></li>
						</ul>
					</Col>
					<Col md='6'>
						<h2>Podany adres</h2>
						<p>{zamówienie.adres}</p>
					</Col>
				</Row>
				<Row>
					<h2>Status zamówienia</h2>
					<p>{zamówienie.status}</p>
				</Row>
			</Container>
		</main>
	)
}

export default Zamówienie