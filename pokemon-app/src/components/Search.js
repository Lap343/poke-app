import React, { useState } from "react";

const Search = ({ getPokeByNameOrIdAPI, setIsEnemy }) => {
  const [pokemonSearchValue, setPokemonSearchValue] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setPokemonSearchValue(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const pokeLowerCase = pokemonSearchValue.toLowerCase();

    getPokeByNameOrIdAPI(pokeLowerCase);
  };

  return (
    <form className="searchbar" onSubmit={onSubmit}>
      <button type="submit" id="searchButton"></button>
      <input
        type="text"
        name="pokemonsearch"
        placeholder="Search for a pokemon"
        value={pokemonSearchValue}
        onChange={onChange}
      />

      <div className="twosearch-pokemon">
        <div className="twosearch-pokemon__title">
          <p className="paragrap">Versus</p>
        </div>

        <div className="twosearch-pokemon__friendly-enemy-container">
          <div className="twosearch-pokemon__friendly">
            <button type="click" onClick={() => setIsEnemy(false)}>
              Your's
            </button>
          </div>

          <div className="twosearch-pokemon__enemy">
            <button type="click" onClick={() => setIsEnemy(true)}>
              Enemy
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Search;
