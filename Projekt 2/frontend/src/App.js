import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Restauracja from './pages/Restauracja';

function App() {
	
	return (
		<div className="App">
			<Router>
				<Link to='/'>Strona główna</Link>
				<Link to='/restauracja'>Zobacz restaurację</Link>
				<Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='/restauracja' exact element={<Restauracja />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App;
