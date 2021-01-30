import React from 'react';
import Card from 'react-bootstrap/Card'

export default function TradeHistory(props){
    let text = ''
    let bg
    if(props.result == "This trade is fair!"){
        text = "This was a good trade! Both of them made a good deal."
        bg = 'success'
    }else{
        text = "there are those who say that it was not a good deal.."
        bg = 'warning'
    }

    return (
        <Card bg={bg} style={{ width: '20rem', height: '10rem', background: 'url(https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nintendoblast.com.br%2F2010%2F10%2Fitem-box-poke-ball.html&psig=AOvVaw0sUgbLyM2uu3YvNEzwfRra&ust=1612063224023000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJj6x9DZwu4CFQAAAAAdAAAAABAD)' }}>
        <Card.Body>
            <Card.Title>Trade {props.idx}</Card.Title>
            <Card.Text>
                {props.pokemons.map(pokemon => <p>- {pokemon.name} - {pokemon.base_expecience}</p>)}
            </Card.Text>
        </Card.Body>
        </Card>
    );
}