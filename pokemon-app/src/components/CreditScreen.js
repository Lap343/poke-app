import React from "react";
import "../styles/CreditScreen.css";
import emolga from "../assets/emolga.gif";
import psyduck from "../assets/duck-poke.png";
import toad from "../assets/toad.png";
import finger from "../assets/finger-pointing.png";
import noctowlHead from "../assets/noctowl-head.png";
import noctowlBody from "../assets/noctowl-body.png";
import noctowlFeet from "../assets/noctowl-feet.png";
import lakeSong from "../assets/sounds/lakeSong.mp3";
import ThemeSongs from "./ThemeSongs";

const CreditScreen = ({ isPlaying, setIsPlaying }) => {
  return (
    <>
      <div className="main credits-container">
        <div>
          <p className="devs-title">Click on the Pokemon below!</p>
          <img id="finger-pointing" src={finger} alt="finger pointing down" />
        </div>

        <div className="luis-credits">
          <h3 className="name-tag">Luis Perez</h3>
          <div className="wholeNoct">
            <a href="https://github.com/Lap343" target="blank">
              <img id="noctowlHead" src={noctowlHead} alt="pokemon" />
              <img id="noctowlBody" src={noctowlBody} alt="pokemon" />
              <img id="noctowlFeet" src={noctowlFeet} alt="pokemon" />
            </a>
          </div>
        </div>

        <div className="elias-credits">
          <h3 className="name-tag">Elias Gutierrez</h3>
          <a href="https://github.com/BlackCubes" target="blank">
            <img id="psyduck" src={psyduck} alt="pokemon" />
          </a>
        </div>

        <div className="jorge-credits">
          <h3 className="name-tag">Jorge Villalobos</h3>
          <a href="https://github.com/JorgeLVilla" target="blank">
            <img id="emolga" src={emolga} alt="pokemon" />
          </a>
        </div>

        <div className="toad-credits">
          <h3 className="name-tag">Key Slayer</h3>
          <img id="toad-credits-img" src={toad} alt="pokemon" />
        </div>
      </div>
      <div className="main">
        <ThemeSongs
          src={lakeSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </>
  );
};

export default CreditScreen;
