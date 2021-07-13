import React from "react";

const PokemonEvolutions = ({ evolutions }) => (
  <div className="pokemon-evolutions">
    <div className="pokemon-evolutions__title">
      <p className="paragraph">Evolutions</p>
    </div>

    <div className="pokemon-evolutions__card-wrapper">
      {!evolutions.length
        ? null
        : evolutions.map((evolve) => (
            <div key={evolve?.id} className="pokemon-evolutions__card">
              <div className="pokemon-evolutions__img">
                <img
                  src={`${evolve?.sprites?.front_default}`}
                  alt={`${evolve?.name}`}
                />
              </div>

              <div className="pokemon-evolutions__name-id">
                <span className="pokemon-evolutions__name">{evolve?.name}</span>

                <span className="pokemon-evolutions__id">{evolve?.id}</span>
              </div>

              <div className="pokemon-evolutions__type">
                {!evolve?.types.length
                  ? null
                  : evolve?.types.map((type, typeIndex) => (
                      <span
                        key={`${evolve?.id}-${typeIndex}`}
                        className="pokemon-evolutions__type-name"
                      >
                        {type?.type?.name}
                      </span>
                    ))}
              </div>
            </div>
          ))}
    </div>
  </div>
);

export default PokemonEvolutions;
