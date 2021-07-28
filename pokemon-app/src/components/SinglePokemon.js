import fightPad from "../assets/fightpad.png";
import mainBackground from "../assets/mainBackground.png";
import PokemonEvolutions from "./PokemonEvolutions";
import TypeCheck from "./TypeCheck";
import "../styles/One-pokemon-page.css";
import ThemeSongs from "./ThemeSongs";
import homeSong from "../assets/homeSong.mp3";
import Types from "./Types";
import PokemonCry from "./PokemonCry";
import { useState, useRef } from "react";

const SinglePokemon = ({
  pokemon,
  evolutions,
  hasEnemy,
  getPokeByNameOrIdAPI,
  isPokeballRendering,
}) => {
  const [statsOnTop, setStatsOnTop] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  // This reference would be used for the moves-list scrollbar
  // in order to get the scrollTop and calculate the bottom scroll.
  const scrollRef = useRef();

  const onScroll = () => {
    // Always check if current exists before doing anything.
    if (scrollRef.current) {
      // Destructure these bad boys.
      const { clientHeight, scrollHeight, scrollTop } = scrollRef.current;

      // Set the integer value on how far the scrollbar is from the top,
      // and this would be used to render the up-arrow for moves-list.
      setScrollTop(scrollTop);

      // Calculate if the scrollbar is at the bottom,
      // and if it is then truthy; else, falsy
      scrollHeight - scrollTop === clientHeight
        ? setIsScrollBottom(true)
        : setIsScrollBottom(false);
    }
  };

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

                  {!pokemon?.moves ? null : !(scrollTop > 0) ? null : (
                    <span
                      className={`moves-list--up-arrow ${
                        hasEnemy ? "has-enemy" : ""
                      }`}
                    ></span>
                  )}

                  {!pokemon?.moves ? null : !(pokemon?.moves.length > 7) ||
                    isScrollBottom ? null : (
                    <span
                      className={`moves-list--down-arrow ${
                        hasEnemy ? "has-enemy" : ""
                      }`}
                    ></span>
                  )}
                </ol>
              </div>
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
