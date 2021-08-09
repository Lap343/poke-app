import { useRef } from "react";
import { audioPlayAsync } from "../utils";

/**
 * Creates an audio reference with a function that handles the play() method.
 * @returns {[audioRef,audioPlay]} An array that contains audioRef and audioPlay.
 */
const useAudio = () => {
  // Initialize the audio reference.
  const audioRef = useRef();

  // This function is used to check if there are no errors on audio play.
  const audioPlay = async (targetAudio) => {
    try {
      // Destructure the status and message.
      const { status, message } = await audioPlayAsync(targetAudio);

      // Check if the status had an error.
      if (status === "error") {
        // Send the error message for the catch block.
        throw new Error(message);
      }
    } catch (error) {
      // Display the error to the console.
      console.error(error);
    }
  };

  return [audioRef, audioPlay];
};

export default useAudio;
