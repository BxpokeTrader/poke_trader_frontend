import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";
import ListPokemons from './listPokemons';

const LeftSide: React.FC = () => {
  const options = [
    { label: "Charmander", value: 100 },
    { label: "Charizard", value: 240 },
    { label: "Pikachu", value: 200 },
  ];

  const [selected, setSelected] = useState([]);

  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "😶 No Pokemons Selected";
  };

  return (
    <div>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        valueRenderer={customValueRenderer}
        labelledBy={"Select the Pokemons"}
      />
      <h3>You will give:</h3>
      {/* TODO: create a component to list the selected Pokemons */}
      <ListPokemons data={selected}/>
    </div>
  );
};

export default LeftSide;