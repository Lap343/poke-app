import { capitalize } from ".";
import { typeJson } from "../components/typeMatchups";

/**
 * Gets the pokemon's type(s); checks to see if that type is in typeJson
 * (and gets it if it exists); and transforms the values of strongAgainst,
 * weakAgainst, resistantTo, and vulnerableTo from a string to an array.
 * @param {[{}]} pokeType
 * @returns {[{}]} An array of objects.
 */
const typeMatchups = (pokeType) =>
  pokeType.map((typeValue) => {
    // Destructure these four properties.
    const { strongAgainst, weakAgainst, resistantTo, vulnerableTo } =
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
    };
  });

/**
 * Creates a counter based on if the attacker is effective against the defender.
 * @param {[{}]} defenderTypeMatchups
 * @param {{}} attackerMoveType
 * @returns {number} A number.
 */
const effectivenessCounter = (defenderTypeMatchups, attackerMoveType) => {
  let effectiveCounter = 0;

  defenderTypeMatchups.forEach((typeMatchup) => {
    // If the enemy's move type is not effective against the friendly pokemon,
    // then decrement.
    if (typeMatchup.strongAgainst.includes(capitalize(attackerMoveType.name))) {
      effectiveCounter -= 2;

      // If the enemy's move type is effective against the friendly pokemon,
      // then increment.
    } else if (
      typeMatchup.weakAgainst.includes(capitalize(attackerMoveType.name))
    ) {
      effectiveCounter += 2;
    }
  });

  return effectiveCounter;
};

/**
 * Checks the effectiveness counter and gives it an associated word.
 * @param {number} effectiveCounter
 * @returns {"Super Effective"|"Ineffective"|""} A string of "Super Effective",
 * "Ineffective", or an empty one.
 */
const effectivenessCounterCheck = (effectiveCounter) =>
  effectiveCounter >= 2
    ? "Super Effective"
    : effectiveCounter < 0
    ? "Ineffective"
    : "";

/**
 * Checks to see the overall effectiveness of the attacker against the defender.
 * @param {[{}]} defenderType
 * @param {[{}]} attackerType
 * @returns {"Super Effective"|"Ineffective"|""} A string of "Super Effective",
 * "Ineffective", or an empty one.
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

  // Check the counter and return it as "Super Effective" or "Ineffective".
  return effectivenessCounterCheck(overallEffectivenessCounter);
};

/**
 * Checks to see if the attacker's moves are effective against the defender.
 * @param {[{}]} defenderType
 * @param {[{}]} attackerMoveTypes
 * @returns {["Super Effective"|"Ineffective"|""]} An array of strings containing
 * "Super Effective", "Ineffective", or an empty one.
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
  // of "Super Effective" or "Ineffective".
  return moveEffectivenessCounter.map((effectiveCounter) =>
    effectivenessCounterCheck(effectiveCounter)
  );
};

export { overallEffectiveness, moveEffectiveness };
