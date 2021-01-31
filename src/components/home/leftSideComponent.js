import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export default function LeftSide(props){

  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [color, setColor] = useState('black')

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const clearSelected = () => {
    setSelected([])
    props.callback([])
    setColor('black')
    props.clear('')
  }

  const saveProposal = () => {
    setColor('green')
    props.callback(selected)
  }

  const searchPokemon = async () => {
    await axios
			.get('https://pokeapi.co/api/v2/pokemon/' + search.toLowerCase())
			.then((response) => {
        if(response.data){
          let data = {
            'name': response.data.name,
            'base_experience': response.data.base_experience,
            'image': response.data.sprites.front_default
          }
          if(selected.length < 6){
            setSelected([...selected, data])
            setColor('black')
          }else{
            // Handle this error!!!
            console.log('Max 6!')
          }
        }
      })
  }

  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Control placeholder="Search a Pokemon" onChange={handleChange} />
          </Col>
        </Row>
        <Button style={{margin:10}} onClick={searchPokemon}>Search</Button>
      </Form>
      <div style={{color:color}}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Your proposal</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          {selected.map((item) => {return (<p><img src={item.image}/>{item.name} - {item.base_experience}</p>)})}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={clearSelected}>Clear</Button>
            <Button variant="primary" onClick={saveProposal}>Save</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>

    </div>

  );
};