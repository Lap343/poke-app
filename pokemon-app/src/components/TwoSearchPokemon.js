import React from "react";

const TwoSearchPokemon = ({ setIsEnemy }) => (
  <div className="twosearch-pokemon">
    <div className="twosearch-pokemon__title">
      <p className="paragrap">Versus</p>
    </div>

    <div className="twosearch-pokemon__friendly-enemy-container">
      <div className="twosearch-pokemon__friendly">
        <button type="click" onClick={() => setIsEnemy(false)}>
          Your's
        </button>
      </div>

      <div className="twosearch-pokemon__enemy">
        <button type="click" onClick={() => setIsEnemy(true)}>
          Enemy
        </button>
      </div>
    </div>
  </div>
);

export default TwoSearchPokemon;
