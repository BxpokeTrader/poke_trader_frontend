import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'

export default function TradeHistory(props){
    const [height, setHeight] = useState('10rem')

    let bg
    if(props.result == "This trade is fair!"){
        bg = 'success'
    }else{
        bg = 'warning'
    }

    useEffect(() => {
		if(props.size < 3){
            setHeight('13rem')
        }else{
            if(props.size < 5){
                setHeight('28rem')
            }else{
                setHeight('32rem')
            }
        }
	}, []);

    return (
        <Card bg={bg} className='trade_history' style={{width: '20rem', height: height}}>
        <Card.Body>
            <Card.Title>Trade {props.idx}</Card.Title>
            <Card.Text>
                {props.pokemons.map(pokemon => <p> <img width="50" height="60" src={pokemon.image}/> {pokemon.name} - {pokemon.base_experience}</p>)}
            </Card.Text>
        </Card.Body>
        </Card>
    );
}