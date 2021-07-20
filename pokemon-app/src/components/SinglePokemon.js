import fightPad from "../assets/fightpad.png";
import mainBackground from "../assets/mainBackground.png";
import PokemonEvolutions from "./PokemonEvolutions";
import TypeCheck from "./TypeCheck";

const SinglePokemon = ({ pokemon, evolutions }) => (
  <>
    {!pokemon ? null : (
      <>
        <div
          className="mainBackground "
          style={{ backgroundImage: `url(${mainBackground})` }}
        >
          <div className="main-container">
            <div className="Poke-display-container">
              <h1 className="poke-name">{pokemon.name}</h1>
              <img
                className="poke-image"
                src={`${pokemon.sprites.front_default}`}
                alt="pokemon"
              />
            </div>
            <div className="stats-box">
              <div className="moves-title">Moves:</div>
              <ol id="moves-list">
                {!pokemon?.moves
                  ? null
                  : pokemon?.moves.map((moveData, moveIndex) => (
                      <li key={moveIndex}>{moveData.move.name}</li>
                    ))}
              </ol>
            </div>
          </div>
          <img
            className="poke-pad"
            src={fightPad}
            alt="lily pad from pokemon game"
          />
        </div>
      </>
    )}

    {evolutions.length && <PokemonEvolutions evolutions={evolutions} />}
    <TypeCheck pokemon={pokemon} />
  </>
);

export default SinglePokemon;
