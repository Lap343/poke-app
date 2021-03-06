import React, { useEffect, useState } from "react";
import { updateHPStats } from "../utils";
import fightSong from "../assets/sounds/fightSong.mp3";
import homeSong from "../assets/sounds/homeSong.mp3";

const Search = ({
  getPokeByNameOrIdAPI,
  pokemon,
  setPokemon,
  setEnemyPokemon,
  isEnemy,
  enemyPokemon,
  setIsEnemy,
  setHasEnemySubmit,
  setIsVersus,
  setIsPokeball,
  isVersus,
  setSource,
  setIsCreditScreen,
  friendlyOriginalHP,
  friendlyPokeStats,
  setFriendlyPokeStats,
}) => {
  const [pokemonSearchValue, setPokemonSearchValue] = useState("");
  // This is more on the UI functionalities like adding a className,
  // handling the onClick for buttons, and disabling buttons
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    if (pokemon && !enemyPokemon) {
      setSource(homeSong);
    }
    if (enemyPokemon) {
      setSource(fightSong);
    }
  }, [enemyPokemon, pokemon]);

  const onChange = (e) => {
    const { value } = e.target;
    setPokemonSearchValue(value);
  };

  const onSubmit = () => {
    if (pokemonSearchValue !== "") {
      const pokeLowerCase = pokemonSearchValue.toLowerCase();

      setHasSelected(true);

      // If the user has not selected an enemy pokemon,
      // then render pokeball animation
      if (!isEnemy && !isVersus) {
        setIsPokeball(true);
      }
      getPokeByNameOrIdAPI(pokeLowerCase);
    }
  };

  const onKeyDown = (e) => e.key === "Enter" && onSubmit();

  const removePokemon = () => {
    setIsCreditScreen(false)
    if (enemyPokemon === null) {
      if (pokemon !== null) {
        setPokemon(null);
        setHasSelected(false);
        setIsPokeball(false);
        setSource("");
      }
    } else {
      setIsVersus(false);
      setEnemyPokemon(null);
      setHasEnemySubmit(false);
      setIsEnemy(false);
      setSource(homeSong);
    }

    // Reset the user's pokemon HP.
    setFriendlyPokeStats(
      updateHPStats(friendlyPokeStats, friendlyOriginalHP, true)
    );
  };

  return (
    <div id="search" className="searchbar">
      <div className="remove-poke-title">
        Remove
        <br />
        Pokemon
      </div>
      <button type="button" id="removeButton" onClick={() => removePokemon()}>
        x
      </button>
      <input
        type="text"
        name="pokemonsearch"
        placeholder="Search for a pokemon"
        value={pokemonSearchValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      <button onClick={onSubmit} className="search-button">
        Search
      </button>

      <div className="twosearch-pokemon">
        <div className="twosearch-pokemon__friendly-enemy-container">
          <div
            className={`twosearch-pokemon__friendly ${
              !isEnemy && hasSelected ? "picked" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setIsEnemy(false)}
              disabled={hasSelected && !isEnemy}
            >
              Search Your's
            </button>
          </div>
          <div
            className={`twosearch-pokemon__enemy ${isEnemy ? "picked" : ""}`}
          >
            <button
              type="button"
              onClick={() => {
                // If the user has not began their initial selection,
                // then don't run
                if (hasSelected) {
                  setIsEnemy(true);
                }
              }}
              disabled={!hasSelected || isEnemy || !pokemon}
            >
              Search Enemy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
