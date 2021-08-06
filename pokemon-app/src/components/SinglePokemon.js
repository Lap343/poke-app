import { useState, useEffect } from "react";
import mainBackground from "../assets/mainBackground.png";
import PokemonEvolutions from "./PokemonEvolutions";
import fightPad from "../assets/fightpad.png";
import PokemonCry from "./PokemonCry";
import TypeCheck from "./TypeCheck";
import MovesList from "./MovesList";
import Types from "./Types";
import "../styles/One-pokemon-page.css";
import "../styles/One-pokemon-page-mobile.css";
import { overallEffectiveness } from "../utils/effectiveness";

const SinglePokemon = ({
  pokemon,
  evolutions,
  hasEnemy,
  getPokeByNameOrIdAPI,
  isPokeballRendering,
  pokeSoundUrl,
  friendlyPokeType,
  enemyPokeType,
}) => {
  const [statsOnTop, setStatsOnTop] = useState(false);

  // This checks if the moves property exist in pokemon object.
  const checkDoesMovesKeyExistInObject = () =>
    Object.prototype.hasOwnProperty.call(pokemon, "moves");

  useEffect(() => {
    if (friendlyPokeType.length && enemyPokeType.length) {
      console.log(overallEffectiveness(enemyPokeType, friendlyPokeType));
    }
  }, [friendlyPokeType, enemyPokeType]);

  return (
    <>
      {!pokemon ? null : (
        <>
          <div
            className="mainBackground "
            style={{ backgroundImage: `url(${mainBackground})` }}
          >
            <div className="main-container">
              <div
                className={`Poke-display-container ${
                  hasEnemy ? "has-enemy" : ""
                }`}
              >
                <h1 className="poke-name">{pokemon.name}</h1>
                <img
                  className="poke-image"
                  src={`${pokemon.sprites.front_default}`}
                  alt="pokemon"
                />
              </div>

              <div
                onClick={() => setStatsOnTop(true)}
                className={`stats-title 
                  ${hasEnemy ? "has-enemy" : ""} 
                  ${statsOnTop ? "on-tip-top" : ""}`}
              >
                Stats:
              </div>

              <div
                onClick={() => setStatsOnTop(false)}
                className={`moves-title 
                  ${hasEnemy ? "has-enemy" : ""} 
                  ${statsOnTop ? "" : "on-tip-top"}`}
              >
                Moves:
              </div>

              <div
                className={`stats-box ${hasEnemy ? "has-enemy" : ""} ${
                  statsOnTop ? "on-top" : ""
                }`}
              >
                <ol id="stats-list">
                  {!pokemon?.stats
                    ? null
                    : pokemon?.stats.map((statData, statIndex) => (
                        <div key={statIndex}>
                          <li>{statData.stat.name}:</li>
                          <div>{statData.base_stat}</div>
                        </div>
                      ))}
                </ol>
              </div>
              <div className={hasEnemy ? "user-poke" : "user-poke-none"}>
                Your Pokemon
              </div>

              {checkDoesMovesKeyExistInObject() && (
                <MovesList
                  pokemonMoves={pokemon?.moves}
                  hasEnemy={hasEnemy}
                  statsOnTop={statsOnTop}
                />
              )}
            </div>
            <div className={`pokemon-types ${hasEnemy ? "has-enemy" : ""}`}>
              <Types pokemon={pokemon} />
            </div>
            <img
              className={`poke-pad ${hasEnemy ? "has-enemy" : ""}`}
              src={fightPad}
              alt="lily pad from pokemon game"
            />
          </div>
        </>
      )}

      {evolutions.length && !hasEnemy && (
        <PokemonEvolutions
          evolutions={evolutions}
          getPokeByNameOrIdAPI={getPokeByNameOrIdAPI}
        />
      )}

      {hasEnemy ? null : <TypeCheck pokemon={pokemon} />}

      <PokemonCry
        pokeSoundUrl={pokeSoundUrl}
        isPokeballRendering={isPokeballRendering}
      />
    </>
  );
};

export default SinglePokemon;
