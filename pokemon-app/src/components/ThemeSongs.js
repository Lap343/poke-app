import React, { useEffect } from "react";
import { useAudio } from "../hooks";
import "../styles/ThemeSongs.css";

const ThemeSongs = ({ src, isPlaying, setIsPlaying }) => {
  const [audioRef, audioPlay] = useAudio();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.volume = 0.08;
        audioPlay(audioRef.current);
      } else {
        console.error("audioPlayer.current not working...");
      }
    }
  }, [src, isPlaying]);

  return (
    <div className="theme-song">
      <audio ref={audioRef} loop src={src}></audio>
      <button
        type="button"
        onClick={togglePlay}
        className={`mute-button ${isPlaying ? "" : "pressed"}`}
      ></button>
    </div>
  );
};

export default ThemeSongs;
