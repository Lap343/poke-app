import React, { useEffect } from "react";
import "../styles/Versus.css";

const Versus = ({ isVersus, setIsVersus }) => {
  useEffect(() => {
    if (isVersus) {
      const timer = setTimeout(() => setIsVersus(false), 1400);
      return () => clearTimeout(timer);
    }
  }, [isVersus, setIsVersus]);

  return (
    <>
      {!isVersus ? null : (
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

          <div className="pokemon-versus__left-background"></div>
          <div className="pokemon-versus__right-background"></div>
        </div>
      )}
    </>
  );
};

export default Versus;
