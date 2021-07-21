import React from "react";
import '../styles/Poke-evolutions.css';

const PokemonEvolutions = ({ evolutions }) => (
  <div className={`pokemon-evolutions`}>
    <div className="pokemon-evolutions__title">
      <p className="paragraph">Evolutions</p>
    </div>

    <div
      className={`pokemon-evolutions__card-wrapper ${
        evolutions.length > 3 ? "eevee" : ""
      }`}
    >
      {!evolutions.length
        ? null
        : evolutions.map((evolve, evolveIndex) => (
            <div
              key={evolve?.id}
              className={`pokemon-evolutions__card ${
                evolutions.length <= 3
                  ? ""
                  : evolveIndex === 0
                  ? "eevee"
                  : "eevee eevee-chain"
              }`}
            >
              <div className="pokemon-evolutions__card-img">
                <img
                  src={`${evolve?.sprites?.front_default}`}
                  alt={`${evolve?.name}`}
                />
              </div>

              <div className="pokemon-evolutions__card-name-id-wrapper">
                <span className="pokemon-evolutions__card-name">
                  {evolve?.name}
                </span>

                <span className="pokemon-evolutions__card-id">
                  {evolve?.id}
                </span>
              </div>

              <div className="pokemon-evolutions__card-type">
                {!evolve?.types.length
                  ? null
                  : evolve?.types.map((type, typeIndex) => (
                      <span
                        key={`${evolve?.id}-${typeIndex}`}
                        className="pokemon-evolutions__card-type-name"
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
