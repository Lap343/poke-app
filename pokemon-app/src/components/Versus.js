import React, { useEffect, useState } from "react";
import "../styles/Versus.css";

const Versus = ({ isVersus }) => {
  const [isDisplay, setIsDisplay] = useState(false);

  useEffect(() => {
    if (isVersus) {
      setIsDisplay(true);
      const timer = setTimeout(() => setIsDisplay(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isVersus]);

  return (
    <>
      {!isVersus ? null : (
        <div className="pokemon-versus">
          <div className="pokemon-versus__left">
            <p 
              className="paragraph pokemon-versus__left-main" 
              data-text="V"
            >
              <span data-text="V">V</span>
            </p>
          </div>

          <div className="pokemon-versus__middle-line">
            <span></span>
          </div>

          <div className="pokemon-versus__right">
            <p 
              className="paragraph pokemon-versus__right-main" 
              data-text="S"
            >
              <span data-text="S">S</span>
            </p>
          </div>

          {isDisplay && (
            <div className="pokemon-versus-background"></div>
          )}
        </div>
      )}
    </>
  );
};

export default Versus;
