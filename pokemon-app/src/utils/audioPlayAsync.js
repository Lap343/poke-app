/**
 * Checks if the audio could be played depending on the browser and/or operating system.
 * @async
 * @returns {{status, message}} An object with a status and message.
 */
const audioPlayAsync = async (targetAudio) => {
  try {
    await targetAudio.play();
    return { status: "success", message: "Audio can be played." };
  } catch (error) {
    targetAudio.pause();
    return { status: "error", message: error };
  }
};

export default audioPlayAsync;
