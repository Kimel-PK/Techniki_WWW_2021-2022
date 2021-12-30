import React from 'react'
// uruchamia zapytania do endpointów
import axios from 'axios'
import { useEffect, useState } from 'react'

function Home() {
	
	const [listaRestauracji, pobierzListeRestauracji] = useState([])
	
	useEffect(() => {
		axios.get('http://localhost:3001/restauracje').then((response) => {
			pobierzListeRestauracji(response.data)
		})
	}, [])
	
	return (
		<div className="App">
			{listaRestauracji.map((value, key) => {
				return (
					<div className='restauracja'>
						<div className='nazwa'>
							{value.nazwa}
						</div>
						<div className='opis'>
							{value.opis}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Home
