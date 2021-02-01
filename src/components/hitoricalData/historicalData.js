import React from 'react';
import './historicalData.css';
import TradeHistory from './tradeHistory';

export default function HistoricalData(props){

	return (
		<div>
			<h1 className='history_title'>Trade History</h1>
			<div className='hitorical_data'>
				<div className='left_side'>
					{/* TODO: Refactor it to make each card as a Trade */}
					{/* <TradeHistory trade={props.trades}/> */}
					<ul>
						{props.trades.map((trade, idx) => (
								<TradeHistory size={Math.max(trade.left_side.length, trade.right_side.length)} idx={idx+1} pokemons={trade.left_side} result={trade.result}/>)
							)
						}
					</ul>
				</div>
				
				<div className='right_side'>
					<ul>
						{props.trades.map((trade, idx) => (
								<TradeHistory size={Math.max(trade.left_side.length, trade.right_side.length)} idx={idx+1} pokemons={trade.right_side} result={trade.result}/>)
							)
						}
					</ul>
				</div>
			</div>
		</div>
		
	);
}