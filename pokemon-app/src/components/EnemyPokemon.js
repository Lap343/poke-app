import React, { useState, useEffect } from "react";
import fightPad from "../assets/fightpad.png";
import PokemonCry from "./PokemonCry";
import ProgressBar from "./ProgressBar";
import MovesList from "./MovesList";
import Types from "./Types";
import "../styles/EnemyPokemon.css";
import "../styles/EnemyPokemon-mobile.css";
import {
  damageEffectiveness,
  moveEffectiveness,
  overallEffectiveness,
} from "../utils/effectiveness";

const EnemyPokemon = ({
  enemyPokemon,
  hasEnemy,
  enemyPokeSoundUrl,
  enemyPokeMoveTypes,
  friendlyPokeType,
  enemyPokeType,
  enemyPokeStats,
  friendlyPokeStats,
  setFriendlyPokeStats,
  enemyStatsOnTop,
  setEnemyStatsOnTop,
  setFriendlyStatsOnTop,
  setIsFriendlyProgressBar,
  isEnemyProgressBar,
  enemyOriginalHP,
}) => {
  const [effectivenessArrayString, setEffectivenessArrayString] = useState([]);
  const [effectivenessArrayInteger, setEffectivenessArrayInteger] = useState(
    []
  );
  const [overallEffectivenessString, setOverallEffectivenessString] =
    useState("");

  // This checks if the moves property exist in pokemon object.
  const checkDoesMovesKeyExistInObject = () =>
    Object.prototype.hasOwnProperty.call(enemyPokemon, "moves");

  const handleDamageEffectiveness = (moveIndex) => {
    const damageOutcome = damageEffectiveness(
      enemyPokeStats,
      enemyPokeMoveTypes[moveIndex]?.power,
      enemyPokeMoveTypes[moveIndex]?.damageClass?.name,
      effectivenessArrayInteger[moveIndex],
      enemyPokeMoveTypes[moveIndex]?.generation?.name,
      enemyPokeMoveTypes[moveIndex]?.type?.name,
      enemyPokeType,
      friendlyPokeStats
    );

    const updatedStats = friendlyPokeStats.map((statsObject) => {
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

    setFriendlyPokeStats(updatedStats);
    setFriendlyStatsOnTop(true);
    setIsFriendlyProgressBar(true);
  };

  useEffect(() => {
    if (
      enemyPokeMoveTypes.length &&
      friendlyPokeType.length &&
      enemyPokeType.length
    ) {
      const { moveCounterString, moveCounterInteger } = moveEffectiveness(
        friendlyPokeType,
        enemyPokeMoveTypes
      );
      const { overallCounterString } = overallEffectiveness(
        friendlyPokeType,
        enemyPokeType
      );

      setEffectivenessArrayString(moveCounterString);
      setOverallEffectivenessString(overallCounterString);

      setEffectivenessArrayInteger(moveCounterInteger);
    }
  }, [enemyPokeMoveTypes, friendlyPokeType, enemyPokeType]);

  return (
    <>
      {!enemyPokemon ? null : (
        <>
          <div className="enemy-pokemon">
            <div className="enemy-pokemon__display">
              <div className="enemy-pokemon__display-name">
                <p className="paragraph">{enemyPokemon?.name}</p>
              </div>

              <div className="enemy-pokemon__display-image">
                <img
                  src={`${enemyPokemon?.sprites?.front_default}`}
                  alt={`Front default of ${enemyPokemon?.name} sprite`}
                />
              </div>

              {hasEnemy && overallEffectivenessString.length > 0 && (
                <span
                  className="effective-label enemy-overall"
                  data-value={`${overallEffectivenessString}`}
                >
                  {overallEffectivenessString}
                </span>
              )}
            </div>

            <div className="enemy-pokemon-types">
              <Types pokemon={enemyPokemon} />
            </div>

            <div
              onClick={() => setEnemyStatsOnTop(true)}
              className={`enemy-pokemon__stats-title ${
                enemyStatsOnTop ? "on-tip-top" : ""
              }`}
            >
              Stats:
            </div>

            <div
              onClick={() => setEnemyStatsOnTop(false)}
              className={`enemy-moves-title ${
                enemyStatsOnTop ? "" : "on-tip-top"
              }`}
            >
              Moves:
            </div>

            <div
              className={`enemy-pokemon__stats ${
                enemyStatsOnTop ? "on-top" : ""
              }`}
            >
              <ol className="enemy-pokemon__stats-list">
                {!enemyPokeStats
                  ? null
                  : enemyPokeStats.map((statData, statIndex) => (
                      <div key={statIndex}>
                        <li>{statData.stat.name}:</li>
                        <div>{statData.base_stat}</div>

                        {isEnemyProgressBar && statData.stat.name === "hp" && (
                          <ProgressBar
                            progress={
                              (statData.base_stat / enemyOriginalHP) * 100
                            }
                          />
                        )}
                      </div>
                    ))}
              </ol>
            </div>

            {checkDoesMovesKeyExistInObject() && (
              <MovesList
                pokemonMoves={enemyPokemon?.moves}
                statsOnTop={enemyStatsOnTop}
                isEnemyPokemon
                effectivenessArrayString={effectivenessArrayString}
                hasEnemy={hasEnemy}
                handleDamageEffectiveness={handleDamageEffectiveness}
              />
            )}

            <div className="enemy-poke">Defender</div>
          </div>

          <div className="poke-pad--enemy">
            <img src={fightPad} alt="Lily pad from Pokemon game" />
          </div>

          <PokemonCry pokeSoundUrl={enemyPokeSoundUrl} />
        </>
      )}
    </>
  );
};

export default EnemyPokemon;
