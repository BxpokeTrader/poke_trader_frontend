import React, {useState, useEffect} from 'react';
import './App.css';
import Menu from './components/menu';
import LeftSide from './components/leftSideComponent'
import RightSide from './components/rightSideComponent'
import axios from 'axios'

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

			<div className='hitorical_data'>
				<div className='left_side'>
					<p>Lado Esquerdo:</p>
					<ul>
						{historic.map(trade => <li>{trade.left_side.map(pokemon => <p>{pokemon.name} - {pokemon.base_expecience}</p>)}</li>)}
					</ul>
				</div>
				
				<div className='right_side'>
					<p>Lado Direito:</p>
					<ul>
						{historic.map(trade => <li>{trade.right_side.map(pokemon => <p>{pokemon.name} - {pokemon.base_expecience}</p>)}</li>)}
					</ul>
				</div>
			</div>
			<p>--------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
		</div>
	);
}