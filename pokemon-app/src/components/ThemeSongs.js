import React, { useEffect, useRef } from "react";
import { audioPlayAsync } from "../utils";
import "../styles/ThemeSongs.css";

const ThemeSongs = ({ src, isPlaying, setIsPlaying }) => {
  const audioPlayer = useRef(); //reference for audio component

  const audioPlay = async (targetAudio) => {
    try {
      const { status, message } = await audioPlayAsync(targetAudio);

      if (status === "error") {
        throw new Error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      if (audioPlayer.current) {
        audioPlayer.current.volume = 0.08;
        audioPlay(audioPlayer.current);
      } else {
        console.error("audioPlayer.current not working...");
      }
    }
  }, [src, isPlaying]);

  return (
    <div className="theme-song">
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
