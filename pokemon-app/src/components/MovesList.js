import React from "react";
import { useScroll } from "../hooks";
import "../styles/MovesList.css";

const MovesList = ({
  pokemonMoves,
  hasEnemy,
  statsOnTop,
  isEnemyPokemon,
  effectivenessArrayString,
}) => {
  const [isScrollBottom, onScroll, scrollRef, scrollTop] = useScroll();

  // This checks if the moves list length is less than or equal to 7.
  const checkIsMovesListLengthSevenOrLess = () => pokemonMoves.length <= 7;
  // This checks if the stats list has been selected.
  const checkIsStatsListSelected = () => statsOnTop;
  // This checks if the scrollbar is at the top.
  const checkIsScrollbarAtTop = () => scrollTop < 1;
  // This checks if the scrollbar is at the bottom.
  const checkIsScrollbarAtBottom = () => isScrollBottom;

  /**
   * To render the top-arrow, this function checks to see if the scrollbar is not at the top AND the stats list has not been selected.
   * @returns {boolean} A boolean.
   */
  const renderMovesListTopArrow = () =>
    // True if the scrollbar is not at the top.
    !checkIsScrollbarAtTop() &&
    // True if the stats list has not been selected.
    !checkIsStatsListSelected();

  /**
   * To render the bottom-arrow, this function checks to see if its moves length is not seven or less AND the scrollbar is not at the bottom AND the stats list has not been selected.
   * @returns {boolean} A boolean.
   */
  const renderMovesListBottomArrow = () =>
    // True if the moves length is greater than seven.
    !checkIsMovesListLengthSevenOrLess() &&
    // True if the scrollbar is not at the bottom.
    !checkIsScrollbarAtBottom() &&
    // True if the stats list has not been selected.
    !checkIsStatsListSelected();

  return (
    <>
      <div
        className={`${isEnemyPokemon ? "enemy-" : ""}moves-box ${
          hasEnemy && !isEnemyPokemon ? "has-enemy" : ""
        } ${statsOnTop ? "" : "on-top"}`}
        ref={scrollRef}
        onScroll={onScroll}
      >
        <ol id={`${isEnemyPokemon ? "enemy-" : ""}moves-list`}>
          {pokemonMoves.map((moveData, moveIndex) => (
            <li className="list-spacing-moves" key={moveIndex}>
              {moveData.move.name}

              {hasEnemy && effectivenessArrayString.length && (
                <span
                  className="effective-label"
                  data-value={`${effectivenessArrayString[moveIndex]}`}
                >
                  {effectivenessArrayString[moveIndex]}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {renderMovesListTopArrow() && (
        <span
          className={`${isEnemyPokemon ? "enemy-" : ""}moves-list--up-arrow ${
            hasEnemy && !isEnemyPokemon ? "has-enemy" : ""
          }`}
        ></span>
      )}

      {renderMovesListBottomArrow() && (
        <span
          className={`${isEnemyPokemon ? "enemy-" : ""}moves-list--down-arrow ${
            hasEnemy && !isEnemyPokemon ? "has-enemy" : ""
          }`}
        ></span>
      )}
    </>
  );
};

export default MovesList;
