import { useState, useEffect } from "react";
import "./App.css";
import dexLeft from "./assets/dex-left.png";
import dexRightOpen from "./assets/dex-right-open.png";
import dexRightClose from "./assets/dex-right-close.png";
import Main from "./components/Main";
import PokemonEvolutions from "./components/PokemonEvolutions";
import SearchPokemon from "./components/SearchPokemon";
import SinglePokemon from "./components/SinglePokemon";
import TwoSearchPokemon from "./components/TwoSearchPokemon";
import { getEvolutionChain, getPokeByNameOrId } from "./utils/api";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [isEnemy, setIsEnemy] = useState(false);

  const getPokeByNameOrIdAPI = async (pokemonAPI) => {
    try {
      const pokeData = await getPokeByNameOrId(pokemonAPI);
      !isEnemy ? setPokemon(pokeData) : setEnemyPokemon(pokeData);
    } catch (error) {
      console.error(error);
    }
  };

  const getEvolutionChainAPI = async (pokemonNameAPI) => {
    try {
      const evolutionData = await getEvolutionChain(pokemonNameAPI);
      setEvolutions(evolutionData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (pokemon && !isEnemy) {
      getEvolutionChainAPI(pokemon?.name);
    }
  }, [pokemon, isEnemy]);

  console.log("enemy pokemon: ", enemyPokemon);

  return (
    <div className="App">
      <img
        id="dex-left"
        src={dexLeft}
        alt="classic pokedex from the Pokemon series"
      />
      <Main />
      <img id="dex-right-closed-opening" src={dexRightClose} alt="" />
      <img id="dex-right-open-opening" src={dexRightOpen} alt="" />
      <SinglePokemon pokemon={pokemon} />
      {evolutions.length && <PokemonEvolutions evolutions={evolutions} />}
      <SearchPokemon getPokeByNameOrIdAPI={getPokeByNameOrIdAPI} />
      <TwoSearchPokemon setIsEnemy={setIsEnemy} />
    </div>
  );
}

export default App;
