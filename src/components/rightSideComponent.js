import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";
import ListPokemons from './listPokemons';

const RightSide: React.FC = () => {
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
          labelledBy={"Select"}
        />
        <h3>You will receive</h3>
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        <ListPokemons data={selected}/>
      </div>
    );
  };

  export default RightSide;