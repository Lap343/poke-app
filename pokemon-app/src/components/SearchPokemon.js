import React, { useState } from 'react';

const SearchPokemon = ({ getPokeByNameOrIdAPI }) => {
  const [pokemonSearchValue, setPokemonSearchValue] = useState('');

  const onChange = (e) => {
    const { value } = e.target;
    setPokemonSearchValue(value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const pokeLowerCase = pokemonSearchValue.toLowerCase();

    getPokeByNameOrIdAPI(pokeLowerCase);
  }

  return (
    <form className="searchbar" onSubmit={onSubmit}>
      <button type="submit" id="searchButton"></button>
      <input type='text' name="pokemonsearch" placeholder="Search for a pokemon" value={pokemonSearchValue} onChange={onChange} />
    </form>
  )
}

export default SearchPokemon;
