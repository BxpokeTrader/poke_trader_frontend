import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const RightSide: React.FC = (props) => {
  
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [color, setColor] = useState('black')
  const [pokemonNotFound, setPokemonNotFound] = useState(false)
  const [moreThanSixError, setMoreThanSixError] = useState(false)

  const handleChange = (event) => {
    setSearch(event.target.value)
    // setPokemonNotFound(false)
  }

  const clearSelected = () => {
    setSelected([])
    props.callback([])
    setColor('black')
    props.clear('')
    setMoreThanSixError(false)
  }

  const saveProposal = () => {
    setColor('green')
    props.callback(selected)
  }

  const searchPokemon = async () => {
    await axios
			.get('https://pokeapi.co/api/v2/pokemon/' + search.toLowerCase())
			.then((response) => {
        if(response.status === 200){
          let data = {
            'name': response.data.name,
            'base_experience': response.data.base_experience,
            'image': response.data.sprites.front_default
          }
          if(selected.length < 6){
            setSelected([...selected, data])
            setColor('black')
          }else{
            setMoreThanSixError(true)
          }
        }else{
          console.log('NOT FOUND!!!')
          setPokemonNotFound(true)
        }
      })
  }

  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Control placeholder="Search a Pokemon" onChange={handleChange} />
            {moreThanSixError && <ErrorMoreThanSix></ErrorMoreThanSix>}
            {pokemonNotFound && <ErrorPokemonNotFound></ErrorPokemonNotFound>}
          </Col>
        </Row>
        <Button style={{margin:10}}onClick={searchPokemon}>Search</Button>
      </Form>
      <Modal.Dialog style={{color: color}}>
        <Modal.Header>
          <Modal.Title>Friend's proposal</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selected.map((item) => {return (<p><img src={item.image} alt='pokemon front'/>{item.name} - {item.base_experience}</p>)})}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={clearSelected}>Clear</Button>
          <Button variant="primary" onClick={saveProposal}>Save</Button>
        </Modal.Footer>
      </Modal.Dialog>

    </div>

  );
};

function ErrorMoreThanSix() {
	return <h6 style={{color: 'red'}}>You can't trade more than six pokemons!</h6>
}

function ErrorPokemonNotFound() {
	return <h4 style={{color: 'red'}}>Pokemon not found!</h4>
}

export default RightSide;

