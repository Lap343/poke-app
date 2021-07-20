import React, { useState } from "react";

const Search = ({ getPokeByNameOrIdAPI, isEnemy, setIsEnemy }) => {
  const [pokemonSearchValue, setPokemonSearchValue] = useState("");
  const [hasSelected, setHasSelected] = useState(false);

  const onChange = (e) => {
    const { value } = e.target;
    setPokemonSearchValue(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const pokeLowerCase = pokemonSearchValue.toLowerCase();

    setHasSelected(true);
    getPokeByNameOrIdAPI(pokeLowerCase);
  };

  return (
    <>
      <form className="searchbar" onSubmit={onSubmit}>
        <button type="submit" id="searchButton"></button>
        <input
          type="text"
          name="pokemonsearch"
          placeholder="Search for a pokemon"
          value={pokemonSearchValue}
          onChange={onChange}
        />
      </form>

      <div className="twosearch-pokemon">
        <div className="twosearch-pokemon__title">
          <p className="paragraph">Versus</p>
        </div>

        <div className="twosearch-pokemon__friendly-enemy-container">
          <div
            className={`twosearch-pokemon__friendly ${
              !isEnemy && hasSelected ? "picked" : ""
            }`}
          >
            <button
              type="click"
              onClick={() => setIsEnemy(false)}
              disabled={!isEnemy}
            >
              Your's
            </button>
          </div>

          <div
            className={`twosearch-pokemon__enemy ${isEnemy ? "picked" : ""}`}
          >
            <button
              type="click"
              onClick={() => {
                if (hasSelected) {
                  setIsEnemy(true);
                }
              }}
              disabled={!hasSelected || isEnemy}
            >
              Enemy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
