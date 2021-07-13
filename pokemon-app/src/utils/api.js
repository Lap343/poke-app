const returnEvolutionChainData = (evolutionChainData) => {
  const evolutionChainUrlArr = evolutionChainData.species.url.split("/");

  return {
    id: parseInt(evolutionChainUrlArr[evolutionChainUrlArr.length - 2]),
    name: evolutionChainData.species.name,
    url: evolutionChainData.species.url,
  };
};

const fetchData = async (url) => {
  return await fetch(url)
    .then((data) => data.json())
    .then((data) => data);
};

export const getPokeByNameOrId = async (pokemon) => {
  try {
    const url = `${process.env.REACT_APP_POKE_API_URL}/${pokemon}`;

    const pokemonData = await fetchData(url);

    const pokemonSpeciesData = await fetchData(pokemonData.species.url);

    const pokemonEvolutionData = await fetchData(
      pokemonSpeciesData.evolution_chain.url
    );

    const completePokemonData = {
      id: pokemonData.id,
      name: pokemonData.name,
      weight: pokemonData.weight,
      moves: pokemonData.moves,
      sprites: pokemonData.sprites,
      stats: pokemonData.stats,
      species: pokemonData.species,
      evolutions: [returnEvolutionChainData(pokemonEvolutionData.chain)],
    };

    // Time Complexity: O(nlogn) 🌲
    function nestedEvolution(evolutionChain) {
      if (evolutionChain.evolves_to.length) {
        evolutionChain.evolves_to.forEach((evolve) => {
          completePokemonData.evolutions.push(returnEvolutionChainData(evolve));
          nestedEvolution(evolve);
        });
      }
    }

    nestedEvolution(pokemonEvolutionData.chain);

    return completePokemonData;
  } catch (error) {
    console.error(error);
  }
};
