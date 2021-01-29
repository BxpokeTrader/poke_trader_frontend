import React, { useState, useEffect } from "react";
import './media.css';

const ListPokemons = ({selected}) => {
    const [data, setValue] = useState(selected);
    useEffect(() => { setValue(data) }, [data]);
	
    return(
        <div>
            <p>{selected}</p>
            {/* data.map((pokemon, index) => {
                return (
                    <p> {index} - {pokemon.label} - {pokemon.value}</p>
                );
            }) */}
        </div>
    );
}


export default ListPokemons;