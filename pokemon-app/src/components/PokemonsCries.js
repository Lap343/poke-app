import React, { useState, useEffect } from "react";
import pokeCries from "../utils/pokeCries";

const PokemonsCries = ({ pokeName }) => {
  const [isPokemonsCries, setIsPokemonsCries] = useState(false);
  const [pokeSoundUrl, setPokeSoundUrl] = useState("");

  const getPokemonsCriesUrl = (chosenPokeName) => {
    if (pokeCries[chosenPokeName]) {
      setIsPokemonsCries(true);
      setPokeSoundUrl(pokeCries[chosenPokeName]);
    }
  };

  // useEffect when a pokemon's name is present
  useEffect(() => {
    // if (pokeName) {
    getPokemonsCriesUrl(pokeName);
    // }
  }, [pokeName]);

  // useEffect for not displaying the audio
  useEffect(() => {
    if (isPokemonsCries) {
      const timer = setTimeout(() => setIsPokemonsCries(false), 2000);

      return () => clearTimeout(timer);
    }
  }, [isPokemonsCries]);

  return (
    isPokemonsCries && (
      <audio
        autoPlay
        className="pokemons-cries"
        controls
        onPlay={(e) => console.log(e)}
      >
        <source type="audio/mp3" src={pokeSoundUrl} />
      </audio>
    )
  );
};

export default PokemonsCries;
