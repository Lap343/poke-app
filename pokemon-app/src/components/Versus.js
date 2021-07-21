import React, { useEffect } from "react";
import "../styles/Versus.css";

const Versus = ({ isVersus, setIsVersus }) => {
  useEffect(() => {
    const timer = setTimeout(() => setIsVersus(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVersus && (
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

export default Versus;
