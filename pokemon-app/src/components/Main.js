import splashBackground from "../assets/splash-background.png";
import splashStar from "../assets/splash-star.png";
import splashTitle from "../assets/splash-title.png";
import SinglePokemon from "./SinglePokemon";
import EnemyPokemon from "./EnemyPokemon";
import "../styles/TypeCheck.css";

const Main = ({ pokemon, evolutions, enemyPokemon }) => {
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
          <SinglePokemon pokemon={pokemon} evolutions={evolutions} />
          {!enemyPokemon ? null : <EnemyPokemon enemyPokemon={enemyPokemon} />}
        </>
      )}
    </div>
  );
};

export default Main;
