import React, { useState, useEffect, useRef } from "react";
import "../styles/ThemeSongs.css";

const ThemeSongs = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const audioPlayer = useRef(); //reference for audio component

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audioPlayer.current) {
      if (!isPlaying) {
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
  }, [src]);

  return (
    <div>
      <audio ref={audioPlayer} loop src={src}></audio>
      <button type="button" onClick={togglePlay} className={`mute-button ${isPlaying ? "" : "pressed"}`} enabled>
      </button>
    </div>
  );
}

export default ThemeSongs;
