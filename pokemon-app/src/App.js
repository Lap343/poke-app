import { useState, useEffect } from "react";
import dexLeft from "./assets/dex-left.png";
import dexRightOpen from "./assets/dex-right-open.png";
import dexRightClose from "./assets/dex-right-close.png";
import Main from "./components/Main";
import Search from "./components/Search";
import {
  getEvolutionChain,
  getPokeByNameOrId,
  getPokeMoveType,
} from "./utils/api";
import "./App.css";
import "./styles/Pokedex-model.css";
import Toad from "./components/toad";
import pokeCries from "./utils/pokeCries";
import reactoadSound from "./assets/sounds/reactoad.mp3";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [friendlyPokeType, setFriendlyPokeType] = useState("");
  const [pokeSoundUrl, setPokeSoundUrl] = useState("");
  const [enemyPokeSoundUrl, setEnemyPokeSoundUrl] = useState("");
  const [evolutions, setEvolutions] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [enemyPokeMoveTypes, setEnemyPokeMoveTypes] = useState([]);
  const [isEnemy, setIsEnemy] = useState(false);
  const [hasEnemySubmit, setHasEnemySubmit] = useState(false);
  const [isVersus, setIsVersus] = useState(false);
  const [isPokeball, setIsPokeball] = useState(false);

  const getPokeSoundUrl = (pokeName) => {
    let pokeSoundUrlPath = "";

    if (pokeName === "Reactoad" || pokeCries[pokeName]) {
      pokeSoundUrlPath =
        pokeName === "Reactoad" ? reactoadSound : pokeCries[pokeName];
    }

    return pokeSoundUrlPath;
  };

  const getPokeMoveTypeAPI = async (pokeMovesArray) => {
    try {
      const dataArray = await getPokeMoveType(pokeMovesArray);

      setEnemyPokeMoveTypes(dataArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getPokeByNameOrIdAPI = async (pokemonAPI) => {
    try {
      const pokeData = await getPokeByNameOrId(pokemonAPI);

      if (!isEnemy) {
        setPokemon(pokeData);
        setFriendlyPokeType(pokeData.types);
        setPokeSoundUrl(getPokeSoundUrl(pokeData.name));
      }

      if (isEnemy) {
        getPokeMoveTypeAPI(pokeData.moves);
        setEnemyPokemon(pokeData);
        setEnemyPokeSoundUrl(getPokeSoundUrl(pokeData.name));
        setHasEnemySubmit(true);
        setIsVersus(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getEvolutionChainAPI = async (pokemonNameAPI) => {
    try {
      if (pokemonNameAPI === "Reactoad") {
        setEvolutions([Toad]);
      } else {
        const evolutionData = await getEvolutionChain(pokemonNameAPI);
        setEvolutions(evolutionData);
      }
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
    <>
      <div className="App">
        <div
          id="dex-left"
          src={dexLeft}
          alt="classic pokedex from the Pokemon series"
        >
          <Main
            pokemon={pokemon}
            evolutions={evolutions}
            enemyPokemon={enemyPokemon}
            hasEnemySubmit={hasEnemySubmit}
            isVersus={isVersus}
            isPokeball={isPokeball}
            setIsPokeball={setIsPokeball}
            getPokeByNameOrIdAPI={getPokeByNameOrIdAPI}
            pokeSoundUrl={pokeSoundUrl}
            enemyPokeSoundUrl={enemyPokeSoundUrl}
            enemyPokeMoveTypes={enemyPokeMoveTypes}
            friendlyPokeType={friendlyPokeType}
          />
          <Search
            getPokeByNameOrIdAPI={getPokeByNameOrIdAPI}
            pokemon={pokemon}
            setPokemon={setPokemon}
            setEnemyPokemon={setEnemyPokemon}
            isEnemy={isEnemy}
            enemyPokemon={enemyPokemon}
            setIsEnemy={setIsEnemy}
            setHasEnemySubmit={setHasEnemySubmit}
            isVersus={isVersus}
            setIsVersus={setIsVersus}
            setIsPokeball={setIsPokeball}
          />
        </div>
        <img id="dex-right-closed" src={dexRightClose} alt="" />
        <img id="dex-right-open" src={dexRightOpen} alt="" />
      </div>
    </>
  );
}

export default App;
