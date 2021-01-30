import React, {useState, useEffect} from 'react';
import axios from 'axios'
import TradeHistory from './tradeHistory';

export default function HistoricalData(props){

	return (
		<div className='hitorical_data'>
				<div className='left_side'>
					<p>Lado Esquerdo:</p>
					{/* TODO: Refactor it to make each card as a Trade */}
					{/* <TradeHistory trade={props.trades}/> */}
					<ul>
						{props.trades.map((trade, idx) => (
								<TradeHistory idx={idx+1} pokemons={trade.left_side} result={trade.result}/>)
							)
						}
					</ul>
				</div>
				
				<div className='right_side'>
					<p>Lado Direito:</p>
					<ul>
						{props.trades.map((trade, idx) => (
								<TradeHistory idx={idx+1} pokemons={trade.right_side} result={trade.result}/>)
							)
						}
					</ul>
				</div>
			</div>
	);
}