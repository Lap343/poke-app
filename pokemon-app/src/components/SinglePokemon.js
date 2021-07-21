import fightPad from "../assets/fightpad.png";
import mainBackground from "../assets/mainBackground.png";
import PokemonEvolutions from "./PokemonEvolutions";
import TypeCheck from "./TypeCheck";
import '../styles/One-pokemon-page.css';

const SinglePokemon = ({ pokemon, evolutions, hasEnemy }) => (
  <>
    {!pokemon ? null : (
      <>
        <div
          className="mainBackground "
          style={{ backgroundImage: `url(${mainBackground})` }}
        >
          <div className="main-container">
            <div
              className={`Poke-display-container ${
                hasEnemy ? "has-enemy" : ""
              }`}
            >
              <h1 className="poke-name">{pokemon.name}</h1>
              <img
                className="poke-image"
                src={`${pokemon.sprites.front_default}`}
                alt="pokemon"
              />
            </div>
            <div className={`stats-box ${hasEnemy ? "has-enemy" : ""}`}>
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
            className={`poke-pad ${hasEnemy ? "has-enemy" : ""}`}
            src={fightPad}
            alt="lily pad from pokemon game"
          />
        </div>
      </>
    )}

    {!evolutions.length ? null : hasEnemy ? null : (
      <PokemonEvolutions evolutions={evolutions} />
    )}

    {hasEnemy ? null : <TypeCheck pokemon={pokemon} />}
  </>
);

export default SinglePokemon;
