import React, { useState, useEffect, useRef } from "react";
import "../styles/ThemeSongs.css";

function ThemeSongs({ src, pokemon }) {
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
      <button type="button" onClick={togglePlay} className={`muteButton ${isPlaying ? "" : "muteButton-pressed"}`} enabled>
      </button>
    </div>
  );
}

export default ThemeSongs;
