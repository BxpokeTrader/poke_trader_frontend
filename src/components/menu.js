import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './media.css';

class Menu extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {};
	}
	
	render(){
		return(
			<Navbar color="primary">
                <div className="container" id="brand">
                    <NavbarBrand>Poke-Trader</NavbarBrand>
                    <Navbar>Historical Trades</Navbar>
                    <Navbar>Pokemons</Navbar>
                </div>
            </Navbar>
		);
	}
}


export default Menu;