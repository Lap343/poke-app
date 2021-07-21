import { useState, useEffect } from "react";
import dexLeft from "./assets/dex-left.png";
import dexRightOpen from "./assets/dex-right-open.png";
import dexRightClose from "./assets/dex-right-close.png";
import Main from "./components/Main";
import Search from "./components/Search";
import { getEvolutionChain, getPokeByNameOrId } from "./utils/api";
import "./App.css";
import "./styles/Pokedex-model.css";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [isEnemy, setIsEnemy] = useState(false);
  const [hasEnemySubmit, setHasEnemySubmit] = useState(false);
  const [isVersus, setIsVersus] = useState(false);
  const [isPokeball, setIsPokeball] = useState(false);

  const getPokeByNameOrIdAPI = async (pokemonAPI) => {
    try {
      const pokeData = await getPokeByNameOrId(pokemonAPI);
      !isEnemy ? setPokemon(pokeData) : setEnemyPokemon(pokeData);
      if (isEnemy) {
        setHasEnemySubmit(true);
        setIsVersus(true);
      }
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

  return (
    <div className="App">
      <img
        id="dex-left"
        src={dexLeft}
        alt="classic pokedex from the Pokemon series"
      />
      <Main
        pokemon={pokemon}
        evolutions={evolutions}
        enemyPokemon={enemyPokemon}
        hasEnemySubmit={hasEnemySubmit}
        isVersus={isVersus}
        isPokeball={isPokeball}
        setIsPokeball={setIsPokeball}
      />
      <img id="dex-right-closed-opening" src={dexRightClose} alt="" />
      <img id="dex-right-open-opening" src={dexRightOpen} alt="" />
      <Search
        getPokeByNameOrIdAPI={getPokeByNameOrIdAPI}
        pokemon={pokemon}
        setPokemon={setPokemon}
        setEnemyPokemon={setEnemyPokemon}
        isEnemy={isEnemy}
        enemyPokemon={enemyPokemon}
        setIsEnemy={setIsEnemy}
        setHasEnemySubmit={setHasEnemySubmit}
        setIsVersus={setIsVersus}
      />
    </div>
  );
}

export default App;
