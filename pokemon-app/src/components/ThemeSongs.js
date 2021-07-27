import React, { useState, useEffect, useRef } from "react";
import "../styles/ThemeSongs.css";

function ThemeSongs({ src }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const audioPlayer = useRef(); //reference for audio component

  const togglePlay = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (audioPlayer.current) {
      if (!prevValue) {
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
    }
  };

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = 0.08;
      audioPlayer.current.play();
    }
  }, []);

  return (
    <div>
      <audio ref={audioPlayer} loop src={src}></audio>
      <button className="soundButton" onClick={togglePlay}>
        Sound
      </button>
    </div>
  );
}

export default ThemeSongs;
