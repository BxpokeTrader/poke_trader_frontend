import React, {useState, useEffect} from 'react';
import './App.css';
import Menu from './components/menu';
import LeftSide from './components/leftSideComponent'
import RightSide from './components/rightSideComponent'
import axios from 'axios'
import HistoricalData from './components/hitoricalData/historicalData';
import Button from 'react-bootstrap/Button'

export default function App(){
	const [historic, setHistoric] = useState([])
	const [leftSide, setLeftSide] = useState([])
	const [rightSide, setRightSide] = useState([])


	useEffect(async () => {
		await axios
			.get('http://localhost:8000/trade/')
			.then(response => setHistoric(response.data.trades))
	}, []);


	function setLeftSideCallback(data){
		setLeftSide(data)
	}

	function setRightSideCallback(data){
		setRightSide(data)
	}

	function handleResponse(response){
		//TODO: Change the interface to show to the user if the trade is fair or not.
	}

	async function verifyTrade(){
		const trade = {
			'right_side': rightSide,
			'left_side': leftSide,
			'result': ''	
		}

		const headers = { 
			'Content-Type': 'application/json'
		};
		
		await axios.post('http://localhost:8000/trade/verify/', trade, { headers })
			.then(response => handleResponse(response.data))
	}

	return (
		<div className='App'>
			<div>
				<Menu/>
				<h1>Verify your trade!</h1>
				<h2>Aqui: {leftSide.length} - {rightSide.length}</h2>
				<div className='trade-input'>
					<LeftSide callback={setLeftSideCallback} className='left-side'/>
					<Button onClick={verifyTrade}>Verify!</Button>
					<RightSide callback={setRightSideCallback} className='right-side'/>
				</div>
			</div>	
			<HistoricalData trades={historic}/>
			<p>--------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
		</div>
	);
}