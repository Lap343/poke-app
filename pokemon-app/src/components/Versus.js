import React, { useEffect, useState } from "react";
import "../styles/Versus.css";

const PokemonVersus = () => {
  const [displayVS, setDisplayVS] = useState(false);

  useEffect(() => {
    setDisplayVS(true);
    const timer = setTimeout(() => setDisplayVS(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {displayVS && (
        <div className="pokemon-versus">
          <div className="pokemon-versus__left">
            <p className="paragraph pokemon-versus__left-main" data-text="V">
              <span data-text="V">V</span>
            </p>
          </div>

          <div className="pokemon-versus__middle-line">
            <span></span>
          </div>

          <div className="pokemon-versus__right">
            <p className="paragraph pokemon-versus__right-main" data-text="S">
              <span data-text="S">S</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonVersus;
