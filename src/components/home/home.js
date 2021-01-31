import React, {useState, useEffect} from 'react';
import Menu from '../menu';
import LeftSide from './leftSideComponent'
import RightSide from './rightSideComponent'
import axios from 'axios'
import HistoricalData from '.././hitoricalData/historicalData';
import Button from 'react-bootstrap/Button'

export default function Home() {
	
	const [historic, setHistoric] = useState([])
	const [leftSide, setLeftSide] = useState([])
	const [rightSide, setRightSide] = useState([])
	const [home, setHome] = useState(true)


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

	function changePageCallback(local){
		setHome(local)
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
				<Menu callback={changePageCallback} local={changePageCallback}/>
				<div hidden={!home}>
					<h1>Verify your trade!</h1>
					<div className='trade-input'>
						<LeftSide callback={setLeftSideCallback} className='left-side'/>
						<Button onClick={verifyTrade}>Verify!</Button>
						<RightSide callback={setRightSideCallback} className='right-side'/>
					</div>
				</div>
			</div>	
			{!home ? <HistoricalData trades={historic}/> : null}
		</div>
	);
}