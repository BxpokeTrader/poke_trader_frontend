import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const LeftSide: React.FC = (props) => {

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
  }

  const saveProposal = () => {
    setColor('green')
    props.callback(selected)
  }

  const searchPokemon = async () => {
    await axios
			.get('https://pokeapi.co/api/v2/pokemon/' + search)
			.then((response) => {
        if(response.data){
          let data = {
            'name': response.data.name,
            'base_experience': response.data.base_experience
          }
          setSelected([...selected, data])
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
        <Button onClick={searchPokemon}>Search</Button>
      </Form>
      <div style={{color:color}}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Sua Proposta</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ul>{selected.map((item) => {return (<li>{item.name}</li>)} )}</ul>
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

export default LeftSide;