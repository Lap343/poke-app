import React, { useEffect, useRef } from "react";
import "../styles/ThemeSongs.css";

const ThemeSongs = ({ src, isPlaying, setIsPlaying }) => {
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
    if (isPlaying) {
      audioPlayer.current.volume = 0.08;
      audioPlayer.current.play();
    }
  }, [src, isPlaying]);

  return (
    <div>
      <audio ref={audioPlayer} loop src={src}></audio>
      <button
        type="button"
        onClick={togglePlay}
        className={`mute-button ${isPlaying ? "" : "pressed"}`}
      ></button>
    </div>
  );
};

export default ThemeSongs;
