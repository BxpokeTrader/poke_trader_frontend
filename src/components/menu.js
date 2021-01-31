import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default function Menu(props){

	const historicalData = () => {
		props.callback(false)
	}

	const homePage = () => {
		props.callback(true)
	}

	return(
		<Navbar color="primary">
			<div className="container" id="brand">
				<NavbarBrand>Poke-Trader</NavbarBrand>
				<a onClick={homePage}>Verify Trade</a>
				<a onClick={historicalData}>Historical Trades</a>
			</div>
		</Navbar>
	);
}


