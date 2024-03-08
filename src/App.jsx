import { useState, useEffect } from "react";
import { getPokemon } from "./api/pokemon";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([
    "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard",
    "squirtle", "wartortle", "blastoise", "pikachu", "raichu", "jigglypuff",
  ]);
  const [selectedPokemon, setSelectedPokemon] = useState(pokemonList[0]);
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    getPokemon(selectedPokemon).then((resp) => {
      setPokemon(resp.data);
    });
  }, [selectedPokemon]);

  const handlePokemonChange = (event) => {
    setSelectedPokemon(event.target.value);
  };

  return (
    <div className="pokemon-details">
      <h1>CHOOSE A POKÉMON</h1>
      <select
        id="pokemonDropdown"
        value={selectedPokemon}
        onChange={handlePokemonChange}
      >
        {pokemonList.map((pokeName) => (
          <option key={pokeName} value={pokeName}>
            {pokeName}
          </option>
        ))}
      </select>

      {pokemon?.name ? (
        <div>
          <h1>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {pokemon?.abilities.length > 0 ? (
        <p>
          Abilities:{" "}
          {pokemon.abilities.map((ability, index) => (
            <span key={index}>
              {ability.ability.name}
              {index < pokemon.abilities.length - 2 ? ", " : index === pokemon.abilities.length - 2 ? " & " : ""}
              {}
            </span>
          ))}
        </p>
      ) : (
        <p>Loading...</p>
      )}
      {pokemon?.sprites && (
        <div>
          <img src={pokemon.sprites.front_default} alt="Pokemon Sprite" />
        </div>
      )}
    </div>
  );
};

export default App;
