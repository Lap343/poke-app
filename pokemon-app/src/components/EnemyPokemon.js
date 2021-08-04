import React, { useState, useEffect } from "react";
import fightPad from "../assets/fightpad.png";
import "../styles/EnemyPokemon.css";
import ThemeSongs from "./ThemeSongs";
import fightSong from "../assets/fightSong.mp3";
import Types from "./Types";
import PokemonCry from "./PokemonCry";
import MovesList from "./MovesList";
import { typeJson } from "./typeMatchups";
import { capitalize } from "../utils";

/**
 * Checks to see if the moves of the enemy are super effective, ineffective, or neutral to the friendly pokemon based on the friendly's type(s).
 * @param {[object]} friendlyPokeType
 * @param {[object]} enemyPokeMoveTypes
 * @returns {[string]} An array of strings.
 */
const moveEffectiveness = (friendlyPokeType, enemyPokeMoveTypes) => {
  // This function returns an array of objects. It gets the Pokemon's type(s);
  // checks to see if that type is in typeJson (and gets it if it exists);
  // and transforms the values of strongAgainst, weakAgainst, resistantTo, and
  // vulnerableTo from a string to an array.
  const friendlyTypeMatchups = friendlyPokeType.map((typeValue) => {
    // Destructure these four properties.
    const { strongAgainst, weakAgainst, resistantTo, vulnerableTo } =
      // Find that type in typeJson, it returns it as a single indexed array,
      // and so we care only to get the object in the pokemon's type property
      // which is in that single indexed (this is so we could destructure).
      typeJson.filter((typeJsonValue) => typeJsonValue[typeValue.type.name])[0][
        typeValue.type.name
      ];

    // Return it as an object of these four properties with the values as an array
    // (this is so we could check if the enemy pokemon's move(s) are super
    // effective, ineffective, or neutral against the friendly pokemon).
    return {
      strongAgainst: strongAgainst.split(", "),
      weakAgainst: weakAgainst.split(", "),
      resistantTo: resistantTo.split(", "),
      vulnerableTo: vulnerableTo.split(", "),
    };
  });

  // This function returns an array of integers. It gets the enemy pokemon's
  // moves and creates a counter based on if it is effective against the
  // friendly pokemon or not.
  const moveEffectivenessCounter = enemyPokeMoveTypes.map((moveType) => {
    let effectiveCounter = 0;

    friendlyTypeMatchups.forEach((typeMatchups) => {
      // If the enemy's move type is not effective against the friendly pokemon,
      // then decrement.
      if (typeMatchups.strongAgainst.includes(capitalize(moveType.name))) {
        effectiveCounter -= 2;
        // If the enemy's move type is effective against the friendly pokemon,
        // then increment.
      } else if (typeMatchups.weakAgainst.includes(capitalize(moveType.name))) {
        effectiveCounter += 2;
        // If the enemy's move type is a standard move type, then add 1.
      } else {
        effectiveCounter += 1;
      }
    });

    return effectiveCounter;
  });

  // This returns the array of strings based on the effectiveness counter.
  return moveEffectivenessCounter.map((effectiveCounter) => {
    if (effectiveCounter >= 2) {
      return "Super Effective";
    } else if (effectiveCounter <= 0) {
      return "Ineffective";
    }

    return "";
  });
};

const EnemyPokemon = ({
  enemyPokemon,
  hasEnemy,
  enemyPokeSoundUrl,
  enemyPokeMoveTypes,
  friendlyPokeType,
}) => {
  const [enemyStatsOnTop, setEnemyStatsOnTop] = useState(true);
  const [effectivenessArray, setEffectivenessArray] = useState([]);

  // This checks if the moves property exist in pokemon object.
  const checkDoesMovesKeyExistInObject = () =>
    Object.prototype.hasOwnProperty.call(enemyPokemon, "moves");

  useEffect(() => {
    if (enemyPokeMoveTypes && friendlyPokeType) {
      setEffectivenessArray(
        moveEffectiveness(friendlyPokeType, enemyPokeMoveTypes)
      );
    }
  }, [enemyPokeMoveTypes, friendlyPokeType]);

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
                {!enemyPokemon?.stats
                  ? null
                  : enemyPokemon?.stats.map((statData, statIndex) => (
                      <div key={statIndex}>
                        <li>{statData.stat.name}:</li>
                        <div>{statData.base_stat}</div>
                      </div>
                    ))}
              </ol>
            </div>

            {checkDoesMovesKeyExistInObject() && (
              <MovesList
                pokemonMoves={enemyPokemon?.moves}
                statsOnTop={enemyStatsOnTop}
                isEnemyPokemon
                effectivenessArray={effectivenessArray}
              />
            )}

            <div className="enemy-poke">Enemy Pokemon</div>
          </div>

          <div className="poke-pad--enemy">
            <img src={fightPad} alt="Lily pad from Pokemon game" />
          </div>

          <PokemonCry pokeSoundUrl={enemyPokeSoundUrl} />
          {hasEnemy && <ThemeSongs src={fightSong} />}
        </>
      )}
    </>
  );
};

export default EnemyPokemon;
