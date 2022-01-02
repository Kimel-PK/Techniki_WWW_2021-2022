import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Restauracja from './pages/Restauracja'
import Logowanie from './pages/Logowanie'
import Kurier from './pages/Kurier'
import Zamówienie from './pages/Zamówienie'
import { Container, Row, Col } from 'react-bootstrap'

function App() {
	return (
		<div className='root'>
			<Router>
				<div className='naglowek'>
					<Container>
						<Row>
							<Col md='4'>
								<Link to='/'>
									<img className='logo' src='https://cdn.pixabay.com/photo/2020/08/23/06/54/cooking-5510047_960_720.png' alt='logo' />
								</Link>
							</Col>
							<Col md='4' className='nazwa'>
								<h1>Restaurancja</h1>
							</Col>
							<Col md='4'></Col>
						</Row>
					</Container>
				</div>
				<Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='/restauracja/:id' exact element={<Restauracja />} />
					<Route path='/login' exact element={<Logowanie />} />
					<Route path='/kurier' exact element={<Kurier />} />
					<Route path='/zamowienie' exact element={<Zamówienie />} />
				</Routes>
				<div className='stopka'>
					<Container>
						<Row>
							<Col md='6'>
								<h2>Meta</h2>
								<p>
									<Link to='/login'>Kurier - logowanie</Link>
								</p>
								<p className='paragraf-ale-link' onClick={ () => {
									console.log (window.sessionStorage)
								}}>Wyświetl dane sesji w konsoli</p>
								<p>
									<Link to='/' onClick={ () => {
										window.sessionStorage.clear()
									}}>Wyczyść sesję</Link>
								</p>
							</Col>
							<Col md='6'>
								<h2>Dane kontaktowe</h2>
								<p>Adres:</p>
								<p>ul. Developerska 13/37<br></br>12-345 xampp</p>
								<p>Tel. 12 345 67 89</p>
								<p>NIP: 1234567890</p>
							</Col>
						</Row>
					</Container>
					<Container fluid>
						<Row>
							<p className='text-center'>Copyright &copy; 2021 - Wszelkie prawa zastrzeżone</p>
						</Row>
					</Container>
				</div>
			</Router>
		</div>
	)
}

export default App;
