import React, { useState, useEffect, useRef } from "react";
import pokeCries from "../utils/pokeCries";
import reactoadSound from "../assets/sounds/reactoad.mp3";

const PokemonCry = ({ pokeName }) => {
  // Set the initial state for rendering the false.
  const [isPokemonsCries, setIsPokemonsCries] = useState(false);
  // Set the sound url to an empty string
  const [pokeSoundUrl, setPokeSoundUrl] = useState("");
  // Initialize the audio reference.
  const audioRef = useRef();

  // First useEffect sets the rendering to true, and sets the sound url
  // which depends on the pokemon's name.
  useEffect(() => {
    // If either names exist, continue.
    if (pokeName === "Reactoad" || pokeCries[pokeName]) {
      // Set the sound url path depending on the pokemon's name.
      const pokeSoundUrlPath =
        pokeName === "Reactoad" ? reactoadSound : pokeCries[pokeName];

      // Set the rendering to true.
      setIsPokemonsCries(true);
      // Set the sound url path.
      setPokeSoundUrl(pokeSoundUrlPath);
    }
  }, [pokeName]);

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
        audioRef.current.play();
      }

      // Whether or not the current audio reference exists,
      // remove the rendered component so it won't just "stay" there.
      const timer = setTimeout(() => setIsPokemonsCries(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isPokemonsCries]);

  return (
    isPokemonsCries && (
      <audio ref={audioRef} className="pokemon-cry" src={pokeSoundUrl} />
    )
  );
};

export default PokemonCry;
