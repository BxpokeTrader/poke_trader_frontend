import React, {useState, useEffect} from 'react';
import './App.css';
import Menu from './components/menu';
import LeftSide from './components/leftSideComponent'
import RightSide from './components/rightSideComponent'
import axios from 'axios'
import HistoricalData from './components/hitoricalData/historicalData';

export default function App(){
	const [historic, setHistoric] = useState([])

	useEffect(async () => {
		await axios
			.get('http://localhost:8000/trade/')
			.then(response => setHistoric(response.data.trades))
	}, []);

	return (
		<div className='App'>
			<div>
				<Menu/>
				<h1>Verify your trade!</h1>
				<div className='trade-input'>
					<LeftSide className='left-side'/>
					<RightSide className='right-side'/>
				</div>
			</div>	
			<HistoricalData trades={historic}/>
			<p>--------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
		</div>
	);
}