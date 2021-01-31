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
		<Navbar color="light">
			<div className="container" id="brand">
				<NavbarBrand onClick={homePage}>Poke-Trader</NavbarBrand>
				<NavbarBrand onClick={homePage}>Verify Trade</NavbarBrand>
				<NavbarBrand onClick={historicalData}>Historical Trades</NavbarBrand>
			</div>
		</Navbar>
	);
}


