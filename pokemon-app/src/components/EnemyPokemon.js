import React, { useState } from "react";
import fightSong from "../assets/fightSong.mp3";
import fightPad from "../assets/fightpad.png";
import PokemonCry from "./PokemonCry";
import ThemeSongs from "./ThemeSongs";
import Types from "./Types";
import "../styles/EnemyPokemon.css";
import "../styles/EnemyPokemon-mobile.css";


const EnemyPokemon = ({ enemyPokemon, hasEnemy }) => {
  const [enemyStatsOnTop, setEnemyStatsOnTop] = useState(false);

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
              className={`enemy-pokemon__moves-title ${
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

            <div
              className={`enemy-pokemon__moves ${
                enemyStatsOnTop ? "" : "on-top"
              }`}
            >
              <ol className="enemy-pokemon__moves-list">
                {!enemyPokemon?.moves
                  ? null
                  : enemyPokemon?.moves.map((moveData, moveIndex) => (
                      <li key={moveIndex}>{moveData.move.name}</li>
                    ))}
              </ol>
            </div>
          </div>

          <div className="poke-pad--enemy">
            <img src={fightPad} alt="Lily pad from Pokemon game" />
          </div>

          <PokemonCry pokeName={enemyPokemon?.name} />
          {hasEnemy && <ThemeSongs src={fightSong} />}
        </>
      )}
    </>
  );
};

export default EnemyPokemon;
