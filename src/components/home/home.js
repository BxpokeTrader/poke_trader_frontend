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
	const [hasError, setHasError] = useState(false)

	useEffect(async () => {
		await axios
			.get('https://poketrader-backend.herokuapp.com/trade/')
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
			if(response.result === 'This trade is fair!'){
				setIsFairColor('green')
			}else{
				setIsFair('gray')
			}
			
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
		await axios.post('https://poketrader-backend.herokuapp.com/trade/save/', trade, { headers })
			.then(response => handleResponse(response.data))
		refreshPage()
	}

	function refreshPage() {
		window.location.reload(false);
	  }

	async function verifyTrade(){
		if(rightSide.length > 0 && leftSide.length > 0) {
			const trade = {
				'right_side': rightSide,
				'left_side': leftSide,
				'result': ''	
			}
			
			const headers = { 
				'Content-Type': 'application/json'
			};
			await axios.post('https://poketrader-backend.herokuapp.com/trade/verify/', trade, { headers })
				.then(response => handleResponse(response.data))
			setHasError(false)
		}else{
			setHasError(true)
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
			{isFair === 'This trade is unfair!' ? <p>Are you sure? I guess that it is not a good choice..</p> : null}
			{isFair === 'This trade is unfair!' && home ? <Button style={{background: isFairColor}} onClick={saveTrade}>I know, but I agree!</Button> : null}
			{isFair === 'This trade is fair!' && home ? <Button style={{background: isFairColor}} onClick={saveTrade}>Save it!!</Button> : null}
			{!home ? <HistoricalData trades={historic}/> : null}
			{hasError && home && <ErrorVerifyWithoutSave></ErrorVerifyWithoutSave>}
		</div>
	);
}

function ErrorVerifyWithoutSave() {
	return <h3 style={{color: 'red'}}>Please search Pokemons and save the proposal before verify it!</h3>
}