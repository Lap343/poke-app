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

  // This checks if the moves property exist in pokemon object.
  const checkDoesMovesKeyExistInObject = () =>
    Object.prototype.hasOwnProperty.call(enemyPokemon, "moves");
  // This checks if the moves list length is less than or equal to 7.
  const checkIsMovesListLengthSevenOrLess = () =>
    enemyPokemon?.moves.length <= 7;
  // This checks if the stats list has been selected.
  const checkIsStatsListSelected = () => enemyStatsOnTop;
  // This checks if the scrollbar is at the top.
  const checkIsScrollbarAtTop = () => scrollTop < 1;
  // This checks if the scrollbar is at the bottom.
  const checkIsScrollbarAtBottom = () => isScrollBottom;

  /**
   * To render the top-arrow, this function checks to see if the pokemon moves exist AND the scrollbar is not at the top AND the stats list has not been selected.
   * @returns {boolean} A boolean.
   */
  const renderMovesListTopArrow = () =>
    // True if the moves property exist in pokemon object.
    checkDoesMovesKeyExistInObject() &&
    // True if the scrollbar is not at the top.
    !checkIsScrollbarAtTop() &&
    // True if the stats list has not been selected.
    !checkIsStatsListSelected();

  /**
   * To render the bottom-arrow, this function checks to see if the pokemon moves exist AND its moves length is not seven or less AND the scrollbar is not at the bottom AND the stats list has not been selected.
   * @returns {boolean} A boolean.
   */
  const renderMovesListBottomArrow = () =>
    // True if the moves property exist in pokemon object.
    checkDoesMovesKeyExistInObject() &&
    // True if the moves length is greater than seven.
    !checkIsMovesListLengthSevenOrLess() &&
    // True if the scrollbar is not at the bottom.
    !checkIsScrollbarAtBottom() &&
    // True if the stats list has not been selected.
    !checkIsStatsListSelected();

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
              </ol>
            </div>

            {renderMovesListTopArrow() && (
              <span className="enemy-moves-list--up-arrow"></span>
            )}

            {renderMovesListBottomArrow() && (
              <span className="enemy-moves-list--down-arrow"></span>
            )}

            <div className="enemy-poke">Enemy Pokemon</div>
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
