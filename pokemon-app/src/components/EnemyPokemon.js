import React from "react";

const EnemyPokemon = ({ enemyPokemon }) =>
  !enemyPokemon ? null : (
    <div className="enemy-pokemon">
      <div className="enemy-pokemon__display">
        <div className="enemy-pokemon__display-name">
          <p className="paragraph">{enemyPokemon?.name}</p>
        </div>

        <div className="enemy-pokemon__display-image">
          <img
            src={`${enemyPokemon?.sprites?.front_default}`}
            alt={`Front default of ${enemyPokemon?.name} sprite`}
          />
        </div>
      </div>

      <div className="enemy-pokemon__stats">
        <div className="enemy-pokemon__stats-title">Enemy moves:</div>

        <ol className="enemy-pokemon__stats-list">
          {!enemyPokemon?.moves
            ? null
            : enemyPokemon?.moves.map((moveData, moveIndex) => (
                <li key={moveIndex}>{moveData.move.name}</li>
              ))}
        </ol>
      </div>
    </div>
  );

export default EnemyPokemon;
