import fightPad from "../assets/fightpad.png";
import mainBackground from "../assets/mainBackground.png";
import PokemonEvolutions from "./PokemonEvolutions";
import TypeCheck from "./TypeCheck";
import "../styles/One-pokemon-page.css";
import ThemeSongs from "./ThemeSongs";
import homeSong from "../assets/homeSong.mp3";
import Types from "./Types";
import PokemonCry from "./PokemonCry";
import { useState } from "react";
import { useScroll } from "../hooks";

const SinglePokemon = ({
  pokemon,
  evolutions,
  hasEnemy,
  getPokeByNameOrIdAPI,
  isPokeballRendering,
}) => {
  const [statsOnTop, setStatsOnTop] = useState(false);
  const [isScrollBottom, onScroll, scrollRef, scrollTop] = useScroll();

  // This checks if the moves property exist in pokemon object.
  const checkDoesMovesKeyExistInObject = () =>
    Object.prototype.hasOwnProperty.call(pokemon, "moves");
  // This checks if the moves list length is less than or equal to 7.
  const checkIsMovesListLengthSevenOrLess = () => pokemon?.moves.length <= 7;
  // This checks if the stats list has been selected.
  const checkIsStatsListSelected = () => statsOnTop;
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

              <div
                className={`moves-box ${hasEnemy ? "has-enemy" : ""} ${
                  statsOnTop ? "" : "on-top"
                }`}
                ref={scrollRef}
                onScroll={onScroll}
              >
                <ol id="moves-list">
                  {!pokemon?.moves
                    ? null
                    : pokemon?.moves.map((moveData, moveIndex) => (
                        <li key={moveIndex}>{moveData.move.name}</li>
                      ))}
                </ol>
              </div>

              {renderMovesListTopArrow() && (
                <span
                  className={`moves-list--up-arrow ${
                    hasEnemy ? "has-enemy" : ""
                  }`}
                ></span>
              )}

              {renderMovesListBottomArrow() && (
                <span
                  className={`moves-list--down-arrow ${
                    hasEnemy ? "has-enemy" : ""
                  }`}
                ></span>
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

      {!isPokeballRendering && <PokemonCry pokeName={pokemon?.name} />}
      {!hasEnemy && <ThemeSongs src={homeSong} />}
    </>
  );
};

export default SinglePokemon;
