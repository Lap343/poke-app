import React, { useEffect } from "react";
import "../styles/Pokeball.css";

const Pokeball = ({ isPokeball, setIsPokeball }) => {
  useEffect(() => {
    if (isPokeball) {
      const timer = setTimeout(() => setIsPokeball(false), 1700);
      return () => clearTimeout(timer);
    }
  }, [isPokeball, setIsPokeball]);

  return !isPokeball ? null : (
    <div className="pokeball-container">
      <div className="pokeball">
        <div className="pokeball__upper"></div>

        <div className="pokeball__lower"></div>

        <div className="pokeball__circle-button"></div>

        <div className="pokeball__equator"></div>

        <div className="pokeball__inner"></div>

        <div className="pokeball__lower-equator"></div>
      </div>

      <div className="pokeball-whiteout"></div>
    </div>
  );
};

export default Pokeball;
