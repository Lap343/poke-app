import fightPad from "../assets/fightpad.png"
import mainBackground from "../assets/mainBackground.png"
import PokemonEvolutions from "./PokemonEvolutions";



function SinglePokemon({ pokemon, evolutions }) {
    const randomMovesGenerator = (moves) => {
        // Initialize empty array
        const movesArray = [];

        // Loop through the moves array from data
        moves.forEach((moveData, moveIndex) => {
            // Generate a random move based on its index
            let randomMoveIndex = Math.floor(Math.random() * pokemon.moves.length);
            // Check if the random index did not generate the same thing
            if (!movesArray.includes(moves[randomMoveIndex])) {
                // Array should have only 4 moves to display
                if (movesArray.length <= 3) {
                    // Disable React error on unique keys lol :)
                    const keyIndex = moveIndex;
                    movesArray.push(<li key={keyIndex}>{moves[randomMoveIndex].move.name}</li>)
                }
            }
        });

        return movesArray;
    }

    return (
        <>
          {pokemon ? (
            <>
        <div className="mainBackground " style={{ backgroundImage: `url(${mainBackground})`}}>
          
            <div className="main-container">
                <div className="Poke-display-container">
                    <h1 className="poke-name">{pokemon.name}</h1>
                    <img className="poke-image" src={`${pokemon.sprites.front_default}`} alt="pokemon"/>
                </div>
                <div className="stats-box">
                    <div className="moves-title">Moves:</div>
                        <ol id="moves-list">{randomMovesGenerator(pokemon.moves)}</ol>
                    {/* {pokemon.moves.map((moveData, moveIndex) => {
                        // 
                        const movesArray = [];
                        // Generate a random move based on its index
                        let randomMoveIndex = Math.floor(Math.random() * pokemon.moves.length);
                        // If moves are not in the 
                        if (!pokemon.moves[randomMoveIndex]) {
                            // Return only 4 moves
                            if (moveIndex <= 3) {
                                return (<p>{pokemon.moves[randomMoveIndex].move.name}</p>);
                            }
                        }
                    })} */}
                </div>
            </div>
                    <img className="poke-pad" src={fightPad} alt="lily pad from pokemon game"/>
        </div>
            </>
          ) : null}
          {evolutions.length && <PokemonEvolutions evolutions={evolutions} />}
        </>
    )
}

export default SinglePokemon;