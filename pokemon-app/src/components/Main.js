import { useState } from "react";
import splashBackground from "../assets/splash-background.png";
import splashStar from "../assets/splash-star.png";
import splashTitle from "../assets/splash-title.png";
import SinglePokemon from "./SinglePokemon";
import EnemyPokemon from "./EnemyPokemon";
import Versus from "./Versus";
import Pokeball from "./Pokeball";
import ThemeSongs from "./ThemeSongs";

const Main = ({
  pokemon,
  evolutions,
  enemyPokemon,
  hasEnemySubmit,
  isVersus,
  isPokeball,
  setIsPokeball,
  getPokeByNameOrIdAPI,
  pokeSoundUrl,
  enemyPokeSoundUrl,
  friendlyPokeMoveTypes,
  enemyPokeMoveTypes,
  friendlyPokeType,
  enemyPokeType,
  friendlyPokeStats,
  enemyPokeStats,
  setFriendlyPokeStats,
  setEnemyPokeStats,
  themeSongSource,
}) => {
  const [enemyStatsOnTop, setEnemyStatsOnTop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="main">
      {pokemon === null ? (
        <div>
          <img className="splash-background" src={splashBackground} alt="" />
          <img className="splash-star" src={splashStar} alt="" />
          <img className="splash-title" src={splashTitle} alt="" />
        </div>
      ) : (
        <>
          <Pokeball isPokeball={isPokeball} setIsPokeball={setIsPokeball} />

          <SinglePokemon
            pokemon={pokemon}
            evolutions={evolutions}
            hasEnemy={hasEnemySubmit}
            getPokeByNameOrIdAPI={getPokeByNameOrIdAPI}
            isPokeballRendering={isPokeball}
            pokeSoundUrl={pokeSoundUrl}
            friendlyPokeMoveTypes={friendlyPokeMoveTypes}
            friendlyPokeType={friendlyPokeType}
            enemyPokeType={enemyPokeType}
            friendlyPokeStats={friendlyPokeStats}
            enemyPokeStats={enemyPokeStats}
            setEnemyPokeStats={setEnemyPokeStats}
            setEnemyStatsOnTop={setEnemyStatsOnTop}
          />

          <Versus isVersus={isVersus} />

          {!enemyPokemon ? null : (
            <EnemyPokemon
              enemyPokemon={enemyPokemon}
              hasEnemy={hasEnemySubmit}
              pokeSoundUrl={pokeSoundUrl}
              enemyPokeSoundUrl={enemyPokeSoundUrl}
              enemyPokeMoveTypes={enemyPokeMoveTypes}
              friendlyPokeType={friendlyPokeType}
              enemyPokeType={enemyPokeType}
              enemyPokeStats={enemyPokeStats}
              friendlyPokeStats={friendlyPokeStats}
              setFriendlyPokeStats={setFriendlyPokeStats}
              enemyStatsOnTop={enemyStatsOnTop}
              setEnemyStatsOnTop={setEnemyStatsOnTop}
            />
          )}

          {themeSongSource.length > 0 && (
            <ThemeSongs
              src={themeSongSource}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Main;
