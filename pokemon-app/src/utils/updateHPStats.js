/**
 * Updates the new HP from the array of the pokemon's stats.
 * @param {Array} pokeStatsArray
 * @param {Number} newHP
 * @param {Boolean} isHPReset Default is false.
 * @returns {Array} An array with an updated HP.
 */
const updateHPStats = (pokeStatsArray, newHP, isHPReset = false) =>
  pokeStatsArray.map((statsObject) => {
    // Cloning this to preserve the original.
    const clonedObject = { ...statsObject };

    if (clonedObject.stat.name === "hp") {
      // If resetting, then reset to the given original HP value.
      // Otherwise, decrement based on the given new HP.
      if (isHPReset) {
        clonedObject.base_stat = newHP;
      } else {
        clonedObject.base_stat -= newHP;
      }

      // This is so there would be no negative values.
      if (clonedObject.base_stat <= 0) {
        clonedObject.base_stat = 0;
      }
    }

    return clonedObject;
  });

export default updateHPStats;
