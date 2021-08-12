/**
 * Calculates a random number between the given minimum and maximum bounds, inclusive.
 * @param {number} min
 * @param {number} max
 * @returns {Number} An integer between the minimum and maximum bounds, inclusive.
 */
export const randomGeneratorInclusive = (min, max) => {
  // If the minimun is not an integer (i.e. float), then go to the highest integer
  // than the minimum. Otherwise, no lower than the minimum.
  const minBound = Math.ceil(min);
  // If the maximum is not an integer (i.e. float), then go to the lowest integer
  // than the maximum. Otherwise, no greater than the maximum.
  const maxBound = Math.floor(max);

  // This would calculate between both bounds, inclusive. Here is an explanation on
  // how this works:
  // The Math.random() function returns a random number in the range of 0 to less than
  // 1. This means that 0 is inclusive while 1 is exclusive (not being 1).
  // Yet, what if you wanted to have a random number between a boundary condition?
  // How would that work? Well, here's how:
  // Consider the interval of Math.random: [0, 1) where '[' = exclusive,
  // and ')' = exclusive.
  // For a boundary condition of max and min: [min, max).
  // Yet, you want the boundary condition to match to the interval of Math.random,
  // or in other words, you want to include 0:
  // [min, max) --> [min-min, max-min) --> [0, max-min).
  // Multiplying Math.round() with (max - min) gives a decimal number
  // between 0 to (max - min).
  // Yet, you want it in the boundary condition between [min, max). To do this is to
  // simply add the min after multiplying Math.round() with (max - min).
  // Next, to get an even distribution is to do Math.floor().
  // YET, what if you wanted max to be INCLUSIVE?
  // Since we are limited with the boundary condition of [min, max) because of the
  // interval of Math.round() [0, 1), the simple fix is to simply add 1 to the max
  // which means max is now included:
  // [min, max) --> [min, max + 1) AND
  // Math.floor(Math.random() * (max - min) + min) BECOMES
  // Math.floor(Math.random() * (max - min + 1) + min).
  return Math.floor(Math.random() * (maxBound - minBound + 1) + minBound);
};

/**
 * Calculates a random number between the given minimum and maximum bounds where the
 * minimum is inclusive while the maximum is exclusive.
 * @param {number} min
 * @param {number} max
 * @returns {Number} A random integer between the bounds of minimum (inclusive)
 * and maximum (exclusive).
 */
export const randomGeneratorExclusive = (min, max) => {
  const minBound = Math.ceil(min);
  const maxBound = Math.floor(max);

  // A random number would not be a maximum (if by chance), but it would be a
  // minimum.
  return Math.floor(Math.random() * (maxBound - minBound) + minBound);
};
