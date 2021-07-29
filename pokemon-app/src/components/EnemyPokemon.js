import React, { useState } from "react";
import fightPad from "../assets/fightpad.png";
import "../styles/EnemyPokemon.css";
import ThemeSongs from "./ThemeSongs";
import fightSong from "../assets/fightSong.mp3";
import Types from "./Types";
import PokemonCry from "./PokemonCry";
import { useScroll } from "../hooks";

const EnemyPokemon = ({ enemyPokemon, hasEnemy }) => {
  const [enemyStatsOnTop, setEnemyStatsOnTop] = useState(true);
  const [isScrollBottom, onScroll, scrollRef, scrollTop] = useScroll();

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
              ref={scrollRef}
              onScroll={onScroll}
            >
              <ol className="enemy-pokemon__moves-list">
                {!enemyPokemon?.moves
                  ? null
                  : enemyPokemon?.moves.map((moveData, moveIndex) => (
                      <li key={moveIndex}>{moveData.move.name}</li>
                    ))}

                {!enemyPokemon?.moves ? null : !(scrollTop > 0) ? null : (
                  <span className="enemy-moves-list--up-arrow"></span>
                )}

                {!enemyPokemon?.moves ? null : !(
                    enemyPokemon?.moves.length > 7
                  ) || isScrollBottom ? null : (
                  <span className="enemy-moves-list--down-arrow"></span>
                )}
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
