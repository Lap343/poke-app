import { capitalize, randomGeneratorInclusive } from ".";
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

  const overallEffectivenessCounterString = effectivenessCounterCheck(
    overallEffectivenessCounter
  );

  // Check the counter and return it as "Super Effective", "Ineffective",
  // "Half Damage", or empty string.
  return {
    overallCounterString: overallEffectivenessCounterString,
    overallCounterInteger: overallEffectivenessCounter,
  };
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
    effectivenessCounter(defenderTypeMatchups, moveType.type)
  );

  const moveEffectivenessCounterString = moveEffectivenessCounter.map(
    (effectiveCounter) => effectivenessCounterCheck(effectiveCounter)
  );

  // Check through each of the array of move counters, and return it as an array
  // of "Super Effective", "Ineffective", "Half Damage", or empty string.
  return {
    moveCounterString: moveEffectivenessCounterString,
    moveCounterInteger: moveEffectivenessCounter,
  };
};

/**
 * Calculates damage dealt when an attacker uses a damaging move depending on its
 * level, its effective Attack or Special Attack stat, the defender's effective
 * Defense or Special Defense stat, and the move's effective power. In addition,
 * various factors of damage modification may also affect the damage dealt.
 * @param {Array} attackerStatsArray
 * @param {Number} attackerMovePower
 * @param {String} attackerMoveDamageClassName
 * @param {Number} attackerMoveEffectiveness
 * @param {String} attackerMoveGenerationName
 * @param {String} attackerMoveType
 * @param {Array} attackerOverallTypes
 * @param {Array} defenderStatsArray
 * @returns {Number} Returns a random number between the lower damage and upper
 * damage, depending on luck.
 */
const damageEffectiveness = (
  attackerStatsArray,
  attackerMovePower,
  attackerMoveDamageClassName,
  attackerMoveEffectiveness,
  attackerMoveGenerationName,
  attackerMoveType,
  attackerOverallTypes,
  defenderStatsArray
) => {
  // A pokemon's level would not have any effect on gameplay like in TCG.
  const attackerLevel = 1;
  // A pokemon's badge would not have any effect on gameplay.
  const badge = 1;
  // There is only one target.
  const targets = 1;
  // No account for weather.
  const weather = 1;
  // No account for burn.
  const burn = 1;
  // No account for other cases.
  const other = 1;

  const type = attackerMoveEffectiveness;

  const power = !attackerMovePower ? 0 : attackerMovePower;

  // This is equal to 1.5 if the attacker move's type matches any of its types, and
  // 1 if otherwise.
  let stab = 1;
  attackerOverallTypes.forEach((overallTypeObject) => {
    if (attackerMoveType === overallTypeObject.type.name) {
      stab = 1.5;
      return;
    }
  });

  // The effective Attack stat of the attacker if the used move is a physical move,
  // or the effective Special Attack stat of the attacker if the used move is a
  // special move.
  const attackerStats = {};
  attackerStatsArray.forEach((statsData) => {
    attackerStats[statsData.stat.name] = statsData.base_stat;
  });
  const attackerEffectiveAttackStat =
    attackerMoveDamageClassName === "physical"
      ? attackerStats.attack
      : attackerMoveDamageClassName === "special"
      ? attackerStats["special-attack"]
      : 0;

  // The effective Defense stat of the defender if the used move is a physical move
  // or a special move that uses the defender's Defense stat, or the effective
  // Special Defense of the defender if the used move is an other special move.
  const defenderStats = {};
  defenderStatsArray.forEach((statsData) => {
    defenderStats[statsData.stat.name] = statsData.base_stat;
  });
  const defenderEffectiveDefendStat =
    attackerMoveDamageClassName === "special"
      ? defenderStats["special-defense"]
      : defenderStats.defense;

  const effectiveAttackStatRatio =
    attackerEffectiveAttackStat / defenderEffectiveDefendStat;

  // Get the move's generation for further calculations.
  const attackerMoveGeneration = attackerMoveGenerationName.split("-").pop();

  // 2 for a critical hit in Generations III-V, 1.5 for a critical hit from
  // Generation VI onward, and 1 otherwise.
  const critical =
    attackerMoveGeneration === "iii" ||
    attackerMoveGeneration === "iv" ||
    attackerMoveGeneration === "v"
      ? 2
      : attackerMoveGeneration === "vi" ||
        attackerMoveGeneration === "vii" ||
        attackerMoveGeneration === "viii"
      ? 1.5
      : 1;

  // Calculate the damage.
  const damage =
    ((((2 * attackerLevel) / 5 + 2) * power * effectiveAttackStatRatio) / 50 +
      2) *
    targets *
    weather *
    badge *
    critical *
    stab *
    type *
    burn *
    other;

  // A random factor for the damage: From Generation III onward, it is a random
  // integer percentage between 0.85 and 1.00 (inclusive). In Generations I and II,
  // it is realized as a multiplication by a random uniformly distributed integer
  // between 217 and 255 (inclusive), followed by an integer division by 255.
  const damageLowerLimit =
    attackerMoveGeneration === "i" || attackerMoveGeneration === "ii"
      ? (217 * damage) / 255
      : 0.85 * damage;

  const damageUpperLimit =
    attackerMoveGeneration === "i" || attackerMoveGeneration === "ii"
      ? (255 * damage) / 255
      : 1 * damage;

  // Return the damage, based on luck.
  return randomGeneratorInclusive(damageLowerLimit, damageUpperLimit);
};

export { overallEffectiveness, moveEffectiveness, damageEffectiveness };
