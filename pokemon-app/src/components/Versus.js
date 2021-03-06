import React from "react";
import "../styles/Versus.css";
import "../styles/Versus-mobile.css";

const Versus = ({ isVersus }) =>
  isVersus && (
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

      <div className="pokemon-versus-background"></div>
    </div>
  );

export default Versus;
