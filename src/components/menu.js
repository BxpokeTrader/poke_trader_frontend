import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import HistoricalData from './hitoricalData/historicalData';
import './media.css';

export default function Menu(){

	const historicalData = (props) => {
		return <HistoricalData/>
	}

	return(
		<Navbar color="primary">
			<div className="container" id="brand">
				<NavbarBrand>Poke-Trader</NavbarBrand>
				<a onClick={historicalData}>Historical Trades</a>
				<Navbar>Pokemons</Navbar>
			</div>
		</Navbar>
	);
}


