import { capitalize } from ".";
import { typeJson } from "../components/typeMatchups";

/**
 * Gets the pokemon's type(s); checks to see if that type is in typeJson
 * (and gets it if it exists); and transforms the values of strongAgainst,
 * weakAgainst, resistantTo, vulnerableTo, and immuneTo from a string to an array.
 * @param {[{}]} pokeType
 * @returns {[{}]} An array of objects.
 */
const typeMatchups = (pokeType) =>
  pokeType.map((typeValue) => {
    // Destructure these four properties.
    const { strongAgainst, weakAgainst, resistantTo, vulnerableTo, immuneTo } =
      // Find that type in typeJson, it returns it as a single indexed array,
      // and so we care only to get the object in the pokemon's type property
      // which is in that single indexed (this is so we could destructure).
      typeJson.filter((typeJsonValue) => typeJsonValue[typeValue.type.name])[0][
        typeValue.type.name
      ];

    // Return it as an object of these four properties with the values as an array
    // (this is so we could check if the enemy pokemon's move(s) are super
    // effective, ineffective, or neutral against the friendly pokemon).
    return {
      strongAgainst: strongAgainst.split(", "),
      weakAgainst: weakAgainst.split(", "),
      resistantTo: resistantTo.split(", "),
      vulnerableTo: vulnerableTo.split(", "),
      immuneTo: immuneTo.split(", "),
    };
  });

/**
 * Creates a counter based on if the attacker is effective against the defender.
 * @param {[{}]} defenderTypeMatchups
 * @param {{}} attackerMoveType
 * @returns {number} A number.
 */
const effectivenessCounter = (defenderTypeMatchups, attackerMoveType) => {
  // This is for the total count based on one-type or more types.
  let effectiveCounterTotal = 1;
  // This array is to handle all cases of one-type, two-types, etc.
  // So, a one-type would have only one index with its count while a two-type
  // would have two indexes with each with its own count.
  let effectiveCounterArray = [0];
  // This is just to make things look more nicer and clearer.
  const attackerTypeName = capitalize(attackerMoveType.name);

  // This would handle a pokemon with one-type, two-types, or more.
  defenderTypeMatchups.forEach((typeMatchup, typeIndex) => {
    const { weakAgainst, resistantTo, immuneTo } = typeMatchup;

    const isWeakAgainst = weakAgainst.includes(attackerTypeName);
    const isResistantTo = resistantTo.includes(attackerTypeName);
    const isImmuneTo = immuneTo.includes(attackerTypeName);

    effectiveCounterArray[typeIndex] = isImmuneTo
      ? // If that type is immune, automatic 0...
        0
      : // ...and if this type is resistant, automatic half-damage...
      isResistantTo
      ? 0.5
      : // ...and if this type is weak, automatic super-effective...
      isWeakAgainst
      ? 2
      : // ...and if nothing else, it is neutraL.
        1;
  });

  effectiveCounterArray.forEach((counter) => {
    effectiveCounterTotal *= counter;
  });

  return effectiveCounterTotal;
};

/**
 * Checks the effectiveness counter and gives it an associated word.
 * @param {number} effectiveCounter
 * @returns {"Super Effective"|"Ineffective"|"Half Damage"|""} A string of
 * "Super Effective", "Ineffective", "Half Damage", or empty string.
 */
const effectivenessCounterCheck = (effectiveCounter) =>
  effectiveCounter >= 2
    ? "Super Effective"
    : effectiveCounter < 1 && effectiveCounter > 0
    ? "Half Damage"
    : effectiveCounter === 0
    ? "Ineffective"
    : "";

/**
 * Checks to see the overall effectiveness of the attacker against the defender.
 * @param {[{}]} defenderType
 * @param {[{}]} attackerType
 * @returns {"Super Effective"|"Ineffective"|"Half Damage"|""} A string of
 * "Super Effective", "Ineffective", "Half Damage", or empty string.
 */
const overallEffectiveness = (defenderType, attackerType) => {
  // Get the defender's type(s).
  const defenderTypeMatchups = typeMatchups(defenderType);

  // Initialize the overall effectiveness counter.
  let overallEffectivenessCounter = 0;

  // Go through each of the attacker's type...
  attackerType.forEach((moveTypeObject) => {
    // ...and check if the defender has a weak/strong type against the attacker.
    // Increment the counter whether or not the defender has a weak type.
    overallEffectivenessCounter += effectivenessCounter(
      defenderTypeMatchups,
      moveTypeObject.type
    );
  });

  // Check the counter and return it as "Super Effective", "Ineffective",
  // "Half Damage", or empty string.
  return effectivenessCounterCheck(overallEffectivenessCounter);
};

/**
 * Checks to see if the attacker's moves are effective against the defender.
 * @param {[{}]} defenderType
 * @param {[{}]} attackerMoveTypes
 * @returns {["Super Effective"|"Ineffective"|"Half Damage"|""]} An array of strings
 * containing "Super Effective", "Ineffective", "Half Damage", or empty string.
 */
const moveEffectiveness = (defenderType, attackerMoveTypes) => {
  // Get the defender's type(s).
  const defenderTypeMatchups = typeMatchups(defenderType);

  // Go through each of the attacker's move type(s) while returning as an array...
  const moveEffectivenessCounter = attackerMoveTypes.map((moveType) =>
    // ...and check if the defender has a weak/strong type against the attacker.
    effectivenessCounter(defenderTypeMatchups, moveType)
  );

  // Check through each of the array of move counters, and return it as an array
  // of "Super Effective", "Ineffective", "Half Damage", or empty string.
  return moveEffectivenessCounter.map((effectiveCounter) =>
    effectivenessCounterCheck(effectiveCounter)
  );
};

export { overallEffectiveness, moveEffectiveness };
