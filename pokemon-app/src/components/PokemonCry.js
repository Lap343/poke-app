import React, { useState, useEffect } from "react";
import { useAudio } from "../hooks";

const PokemonCry = ({ pokeSoundUrl, isPokeballRendering }) => {
  // Set the initial state for rendering the false.
  const [isPokemonsCries, setIsPokemonsCries] = useState(false);
  const [audioRef, audioPlay] = useAudio();

  useEffect(() => {
    // If sound url exists and the pokeball animation is not rendering,
    // continue.
    if (pokeSoundUrl.length && !isPokeballRendering) {
      // Set the cries to true in order to trigger the second useEffect.
      setIsPokemonsCries(true);
    }
  }, [pokeSoundUrl, isPokeballRendering]);

  // Second useEffect changes the audio reference, and resets the rendering
  // which depends on the rendering boolean state.
  useEffect(() => {
    // If the rendering boolean state is true, proceed.
    if (isPokemonsCries) {
      // This checks if the current audio reference exist,
      // and if it does then continue.
      if (audioRef.current) {
        // Decrease the audio volume.
        audioRef.current.volume = 0.15;
        // Play the audio.
        // audioRef.current.play();
        audioPlay(audioRef.current);
      }

      // Whether or not the current audio reference exists,
      // remove the rendered component so it won't just "stay" there.
      const timer = setTimeout(() => setIsPokemonsCries(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isPokemonsCries]);

  return <audio ref={audioRef} className="pokemon-cry" src={pokeSoundUrl} />;
};

export default PokemonCry;
