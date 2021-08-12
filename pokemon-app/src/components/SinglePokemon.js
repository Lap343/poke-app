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
import {
  damageEffectiveness,
  moveEffectiveness,
  overallEffectiveness,
} from "../utils/effectiveness";

const SinglePokemon = ({
  pokemon,
  evolutions,
  hasEnemy,
  getPokeByNameOrIdAPI,
  isPokeballRendering,
  pokeSoundUrl,
  friendlyPokeMoveTypes,
  friendlyPokeType,
  enemyPokeType,
  friendlyPokeStats,
  enemyPokeStats,
  setEnemyPokeStats,
}) => {
  const [statsOnTop, setStatsOnTop] = useState(false);
  const [effectivenessArrayString, setEffectivenessArrayString] = useState([]);
  const [effectivenessArrayInteger, setEffectivenessArrayInteger] = useState(
    []
  );
  const [overallEffectivenessString, setOverallEffectivenessString] =
    useState("");

  // This checks if the moves property exist in pokemon object.
  const checkDoesMovesKeyExistInObject = () =>
    Object.prototype.hasOwnProperty.call(pokemon, "moves");

  const handleDamageEffectiveness = (moveIndex) => {
    const damageOutcome = damageEffectiveness(
      friendlyPokeStats,
      friendlyPokeMoveTypes[moveIndex]?.power,
      friendlyPokeMoveTypes[moveIndex]?.damageClass?.name,
      effectivenessArrayInteger[moveIndex],
      friendlyPokeMoveTypes[moveIndex]?.generation?.name,
      friendlyPokeMoveTypes[moveIndex]?.type?.name,
      friendlyPokeType,
      enemyPokeStats
    );

    const updatedStats = enemyPokeStats.map((statsObject) => {
      const clonedObject = { ...statsObject };

      if (clonedObject.stat.name === "hp") {
        clonedObject.base_stat -= damageOutcome;
      }
      return clonedObject;
    });

    setEnemyPokeStats(updatedStats);
  };

  useEffect(() => {
    if (
      friendlyPokeMoveTypes.length &&
      friendlyPokeType.length &&
      enemyPokeType.length
    ) {
      const { moveCounterString, moveCounterInteger } = moveEffectiveness(
        enemyPokeType,
        friendlyPokeMoveTypes
      );
      const { overallCounterString } = overallEffectiveness(
        enemyPokeType,
        friendlyPokeType
      );

      setEffectivenessArrayString(moveCounterString);
      setOverallEffectivenessString(overallCounterString);

      setEffectivenessArrayInteger(moveCounterInteger);
    }
  }, [friendlyPokeMoveTypes, friendlyPokeType, enemyPokeType]);

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

                {hasEnemy && overallEffectivenessString.length > 0 && (
                  <span
                    className="effective-label friendly-overall"
                    data-value={`${overallEffectivenessString}`}
                  >
                    {overallEffectivenessString}
                  </span>
                )}
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
                Attacker
              </div>

              {checkDoesMovesKeyExistInObject() && (
                <MovesList
                  pokemonMoves={pokemon?.moves}
                  hasEnemy={hasEnemy}
                  statsOnTop={statsOnTop}
                  effectivenessArrayString={effectivenessArrayString}
                  handleDamageEffectiveness={handleDamageEffectiveness}
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
