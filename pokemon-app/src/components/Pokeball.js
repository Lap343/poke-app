import React, { useEffect, useState } from "react";
import "../styles/Pokeball.css";

const Pokeball = ({ isPokeball }) => {
  const [isDisplay, setIsDisplay] = useState(false);

  useEffect(() => {
    if (isPokeball) {
      setIsDisplay(true);
      const timer = setTimeout(() => setIsDisplay(false), 2600);
      return () => clearTimeout(timer);
    }
  }, [isPokeball]);

  return !isPokeball ? null : isDisplay ? (
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
  ) : null;
};

export default Pokeball;
