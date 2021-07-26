import React, { useState, useEffect } from "react";
import pokeCries from "../utils/pokeCries";
import reactoadSound from "../assets/sounds/reactoad.mp3";

const PokemonCry = ({ pokeName }) => {
  const [isPokemonsCries, setIsPokemonsCries] = useState(false);
  const [pokeSoundUrl, setPokeSoundUrl] = useState("");

  // useEffect when a pokemon's name is present
  useEffect(() => {
    if (pokeName === "Reactoad") {
      setIsPokemonsCries(true);
      setPokeSoundUrl(reactoadSound);
    } else if (pokeCries[pokeName]) {
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
      <audio autoPlay className="pokemon-cry">
        <source type="audio/mp3" src={pokeSoundUrl} />
      </audio>
    )
  );
};

export default PokemonCry;
