import React, { useState, useEffect } from "react";
import pokeCries from "../utils/pokeCries";

const PokemonCry = ({ pokeName }) => {
  const [isPokemonsCries, setIsPokemonsCries] = useState(false);
  const [pokeSoundUrl, setPokeSoundUrl] = useState("");

  // useEffect when a pokemon's name is present
  useEffect(() => {
    if (pokeCries[pokeName]) {
      setIsPokemonsCries(true);
      setPokeSoundUrl(pokeCries[pokeName]);
    }
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
      <audio autoPlay className="pokemons-cries" controls>
        <source type="audio/mp3" src={pokeSoundUrl} />
      </audio>
    )
  );
};

export default PokemonCry;
