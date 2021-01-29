import React from 'react';
import './media.css';

class ListPokemons extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {'pokemons': this.props.data};
	}
	
	render(){
		return(
			this.state.pokemons.map((pokemon, index) => {
                return (
                    <p>{index} - {pokemon.label} - {pokemon.value}</p>
                );
            })
		);
	}
}


export default ListPokemons;