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
import "./styles/Pokedex-model-mobile.css";
import Toad from "./components/toad";
import pokeCries from "./utils/pokeCries";
import reactoadSound from "./assets/sounds/reactoad.mp3";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [friendlyPokeType, setFriendlyPokeType] = useState([]);
  const [friendlyPokeMoveTypes, setFriendlyPokeMoveTypes] = useState([]);
  const [friendlyPokeStats, setFriendlyPokeStats] = useState([]);
  const [friendlyOriginalHP, setFriendlyOriginalHP] = useState(0);
  const [pokeSoundUrl, setPokeSoundUrl] = useState("");
  const [enemyPokeSoundUrl, setEnemyPokeSoundUrl] = useState("");
  const [evolutions, setEvolutions] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [enemyPokeType, setEnemyPokeType] = useState([]);
  const [enemyPokeMoveTypes, setEnemyPokeMoveTypes] = useState([]);
  const [enemyPokeStats, setEnemyPokeStats] = useState([]);
  const [enemyOriginalHP, setEnemyOriginalHP] = useState(0);
  const [isEnemy, setIsEnemy] = useState(false);
  const [hasEnemySubmit, setHasEnemySubmit] = useState(false);
  const [isVersus, setIsVersus] = useState(false);
  const [isPokeball, setIsPokeball] = useState(false);
  const [source, setSource] = useState("");

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

      !isEnemy
        ? setFriendlyPokeMoveTypes(dataArray)
        : setEnemyPokeMoveTypes(dataArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getPokeByNameOrIdAPI = async (pokemonAPI) => {
    try {
      const pokeData = await getPokeByNameOrId(pokemonAPI);

      getPokeMoveTypeAPI(pokeData.moves);

      if (!isEnemy) {
        setPokemon(pokeData);
        setFriendlyPokeType(pokeData.types);
        setFriendlyPokeStats(pokeData.stats);
        setFriendlyOriginalHP(pokeData.originalHP);
        setPokeSoundUrl(getPokeSoundUrl(pokeData.name));

        if (hasEnemySubmit) {
          const updatedStats = enemyPokeStats.map((statsObject) => {
            const clonedObject = { ...statsObject };

            if (clonedObject.stat.name === "hp") {
              clonedObject.base_stat = enemyOriginalHP;

              // This is so there would be no negative values.
              if (clonedObject.base_stat <= 0) {
                clonedObject.base_stat = 0;
              }
            }
            return clonedObject;
          });

          setEnemyPokeStats(updatedStats);
        }
      }

      if (isEnemy) {
        setEnemyPokemon(pokeData);
        setEnemyPokeType(pokeData.types);
        setEnemyPokeStats(pokeData.stats);
        setEnemyOriginalHP(pokeData.originalHP);
        setEnemyPokeSoundUrl(getPokeSoundUrl(pokeData.name));
        setHasEnemySubmit(true);
        setIsVersus(true);

        const updatedStats = friendlyPokeStats.map((statsObject) => {
          const clonedObject = { ...statsObject };

          if (clonedObject.stat.name === "hp") {
            clonedObject.base_stat = friendlyOriginalHP;

            // This is so there would be no negative values.
            if (clonedObject.base_stat <= 0) {
              clonedObject.base_stat = 0;
            }
          }
          return clonedObject;
        });

        setFriendlyPokeStats(updatedStats);
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
            friendlyPokeMoveTypes={friendlyPokeMoveTypes}
            enemyPokeMoveTypes={enemyPokeMoveTypes}
            friendlyPokeType={friendlyPokeType}
            enemyPokeType={enemyPokeType}
            friendlyPokeStats={friendlyPokeStats}
            enemyPokeStats={enemyPokeStats}
            setEnemyPokeStats={setEnemyPokeStats}
            setFriendlyPokeStats={setFriendlyPokeStats}
            friendlyOriginalHP={friendlyOriginalHP}
            enemyOriginalHP={enemyOriginalHP}
            themeSongSource={source}
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
            setSource={setSource}
            friendlyOriginalHP={friendlyOriginalHP}
            friendlyPokeStats={friendlyPokeStats}
            setFriendlyPokeStats={setFriendlyPokeStats}
          />
        </div>
        <img id="dex-right-closed" src={dexRightClose} alt="" />
        <img id="dex-right-open" src={dexRightOpen} alt="" />
      </div>
    </>
  );
}

export default App;
