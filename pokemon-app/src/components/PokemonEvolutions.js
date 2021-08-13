import React from "react";
import Types from "./Types";
import "../styles/Poke-evolutions.css";

const PokemonEvolutions = ({ evolutions, getPokeByNameOrIdAPI }) => (
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
                <button
                  className="pokemon-evolutions__card-img--btn"
                  onClick={() => getPokeByNameOrIdAPI(evolve?.name)}
                >
                  <img
                    src={`${evolve?.sprites?.front_default}`}
                    alt={`${evolve?.name}`}
                  />
                </button>
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
                  : <Types pokemon={evolve} />}
              </div>
            </div>
          ))}
    </div>
  </div>
);

export default PokemonEvolutions;
