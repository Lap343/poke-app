import { useState, useEffect } from "react";
import mainBackground from "../assets/mainBackground.png";
import PokemonEvolutions from "./PokemonEvolutions";
import fightPad from "../assets/fightpad.png";
import PokemonCry from "./PokemonCry";
import ProgressBar from "./ProgressBar";
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
  friendlyStatsOnTop,
  setFriendlyStatsOnTop,
  setEnemyStatsOnTop,
  setIsEnemyProgressBar,
  isFriendlyProgressBar,
  friendlyOriginalHP,
}) => {
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

        // This is so there would be no negative values.
        if (clonedObject.base_stat <= 0) {
          clonedObject.base_stat = 0;
        }
      }
      return clonedObject;
    });

    setEnemyPokeStats(updatedStats);
    setEnemyStatsOnTop(true);
    setIsEnemyProgressBar(true);
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
                onClick={() => setFriendlyStatsOnTop(true)}
                className={`stats-title 
                  ${hasEnemy ? "has-enemy" : ""} 
                  ${friendlyStatsOnTop ? "on-tip-top" : ""}`}
              >
                Stats:
              </div>

              <div
                onClick={() => setFriendlyStatsOnTop(false)}
                className={`moves-title 
                  ${hasEnemy ? "has-enemy" : ""} 
                  ${friendlyStatsOnTop ? "" : "on-tip-top"}`}
              >
                Moves:
              </div>

              <div
                className={`stats-box ${hasEnemy ? "has-enemy" : ""} ${
                  friendlyStatsOnTop ? "on-top" : ""
                }`}
              >
                <ol id="stats-list">
                  {!friendlyPokeStats
                    ? null
                    : friendlyPokeStats.map((statData, statIndex) => (
                        <div key={statIndex}>
                          <li>{statData.stat.name}:</li>
                          <div>{statData.base_stat}</div>

                          {isFriendlyProgressBar &&
                            statData.stat.name === "hp" && (
                              <ProgressBar
                                progress={
                                  (statData.base_stat / friendlyOriginalHP) *
                                  100
                                }
                              />
                            )}
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
                  statsOnTop={friendlyStatsOnTop}
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
