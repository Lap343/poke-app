import Toad from "../components/toad";

const fetchData = async (url) => {
  return await fetch(url)
    .then((data) => data.json())
    .then((data) => data);
};

export const getPokeByNameOrId = async (pokemon) => {
  try {
    const url = `${process.env.REACT_APP_POKE_API_URL}/${pokemon}`;
    const { id, name, weight, moves, sprites, stats, species, types } =
      await fetchData(url);

    // This is so the original HP could be used for health progress calculations.
    let originalHP = 0;
    stats.forEach((statsObject) => {
      if (statsObject.stat.name === "hp") {
        originalHP = statsObject.base_stat;
      }
    });

    return {
      id,
      name,
      weight,
      moves,
      sprites,
      stats,
      species,
      types,
      originalHP,
    };
  } catch (error) {
    return { ...Toad, originalHP: 1000 };
  }
};

/**
 * Calls the pokemon moves API, and gets the type object from that API.
 * @async
 * @returns {Promise.<[object]>} An array of objects.
 */
export const getPokeMoveType = async (pokeMovesArray) => {
  try {
    return await Promise.all(
      pokeMovesArray.map(async (moveValue) => {
        const { url } = moveValue.move;

        const { type, power, generation, damage_class } = await fetchData(url);

        return { type, power, generation, damageClass: damage_class };
      })
    );
  } catch (error) {
    return Toad.moves.map((moveValue) => ({
      type: moveValue.move.type,
      power: moveValue.move.power,
      generation: moveValue.move.generation,
      damageClass: moveValue.move.damage_class,
    }));
  }
};

export const getEvolutionChain = async (pokemonName) => {
  try {
    const pokemonData = await getPokeByNameOrId(pokemonName);
    const pokemonSpeciesData = await fetchData(pokemonData.species.url);
    const pokemonEvolutionData = await fetchData(
      pokemonSpeciesData.evolution_chain.url
    );

    // Gets the first chain of the pokemon which is guaranteed i.e. its initial start
    const evolutionNameArr = [pokemonEvolutionData.chain.species.name];

    // Gets any pokemon's evolution that might be nested in the object,
    // then insert that pokemon's name into the array
    function nestedEvolution(evolutionChain) {
      if (evolutionChain.evolves_to.length) {
        evolutionChain.evolves_to.forEach((evolve) => {
          evolutionNameArr.push(evolve.species.name);
          nestedEvolution(evolve);
        });
      }
    }
    nestedEvolution(pokemonEvolutionData.chain);

    // Make a final API call that calls all of the pokemon's evolution based on its name,
    // and returns the specified fields as an array
    return await Promise.all(
      evolutionNameArr.map(async (pokeName) => {
        const url = `${process.env.REACT_APP_POKE_API_URL}/${pokeName}`;
        const { id, name, sprites, types } = await fetchData(url);
        return { id, name, sprites, types };
      })
    );
  } catch (error) {
    console.error(error);
  }
};
