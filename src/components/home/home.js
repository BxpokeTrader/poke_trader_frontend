import React, {useState, useEffect} from 'react';
import Menu from '../menu';
import LeftSide from './leftSideComponent'
import RightSide from './rightSideComponent'
import axios from 'axios'
import HistoricalData from '.././hitoricalData/historicalData';
import Button from 'react-bootstrap/Button'
import './home.css';

export default function Home() {
	
	const [historic, setHistoric] = useState([])
	const [leftSide, setLeftSide] = useState([])
	const [rightSide, setRightSide] = useState([])
	const [home, setHome] = useState(true)
	const [isFair, setIsFair] = useState('')
	const [isFairColor, setIsFairColor] = useState('blue')

	useEffect(async () => {
		await axios
			.get('http://localhost:8000/trade/')
			.then(response => setHistoric(response.data.trades))
	}, [home]);


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
		setIsFair(response.result)
		if(response.result === 'This trade is unfair!'){
			setIsFairColor('#f6a410')
		}else{
			setIsFairColor('green')
		}
	}

	async function saveTrade(){
		const headers = { 
			'Content-Type': 'application/json'
		};

		const trade = {
			'right_side': rightSide,
			'left_side': leftSide,
			'result': ''	
		}
		await axios.post('http://localhost:8000/trade/save/', trade, { headers })
			.then(response => handleResponse(response.data))
		refreshPage()
	}

	function refreshPage() {
		window.location.reload(false);
	  }

	async function verifyTrade(){
		if(rightSide.length && leftSide.length) {
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
		}else{
			console.log('error! Handle it!')
		}
		
	}

	return (
		<div className='App'>
			<div>
				<Menu callback={changePageCallback} local={changePageCallback}/>
				<div hidden={!home}>
					<h1>Verify your trade!</h1>
					<h2>{isFair}</h2>
					
					<div className='trade-input'>
						<LeftSide clear={setIsFair} callback={setLeftSideCallback} className='left-side'/>
						<RightSide clear={setIsFair} callback={setRightSideCallback} className='right-side'/>
					</div>
					<Button className='verify_button' onClick={verifyTrade}>Verify!</Button>
				</div>
			</div>	
			{isFair !== '' ? <Button style={{background: isFairColor}} onClick={saveTrade}>Save Trade</Button> : null}
			{isFair === 'This trade is unfair!' ? <p>Are you sure? I guess that it is not a good choice..</p> : null}
			{!home ? <HistoricalData trades={historic}/> : null}
		</div>
	);
}