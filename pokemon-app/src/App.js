import { useState } from 'react';
import './App.css';
import dexLeft from "./assets/dex-left.png";
import dexRightOpen from "./assets/dex-right-open.png";
import dexRightClose from "./assets/dex-right-close.png";
import Main from "./components/Main";
import SearchPokemon from './components/SearchPokemon';
import SinglePokemon from './components/SinglePokemon';
import { getPokeByNameOrId } from "./utils/api";

function App() {
  const [pokemon, setPokemon] = useState(null);

  const getPokeByNameOrIdAPI = async (pokemon) => {
    try {
      const pokeData = await getPokeByNameOrId(pokemon);
      setPokemon(pokeData);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <img 
        id="dex-left" 
        src={dexLeft} 
        alt="classic pokedex from the Pokemon series"/>
      <Main />
      <img 
        id="dex-right-closed-opening" 
        src={dexRightClose}
        alt=""/>
      <img 
        id="dex-right-open-opening" 
        src={dexRightOpen} 
        alt=""/>
        <SinglePokemon pokemon={pokemon} />
        <SearchPokemon getPokeByNameOrIdAPI={getPokeByNameOrIdAPI} />
    </div>
  );
}

export default App;