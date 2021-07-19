import splashBackground from "../assets/splash-background.png";
import splashStar from "../assets/splash-star.png";
import splashTitle from "../assets/splash-title.png";
import SinglePokemon from "./SinglePokemon";
import EnemyPokemon from "./EnemyPokemon";

const Main = ({ pokemon, evolutions, enemyPokemon }) => {
  return (
    <div className="main">
      <img className="splash-background" src={splashBackground} alt="" />
      <img className="splash-star" src={splashStar} alt="" />
      <img className="splash-title" src={splashTitle} alt="" />
      <SinglePokemon pokemon={pokemon} evolutions={evolutions} />
      <EnemyPokemon enemyPokemon={enemyPokemon} />
    </div>
  );
};

export default Main;
