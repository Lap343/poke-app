import './App.css';
import dexLeft from "./assets/dex-left.png";
import dexRightOpen from "./assets/dex-right-open.png";
import dexRightClose from "./assets/dex-right-close.png";
import Main from "./components/Main";
// import SearchPokemon from './components/SearchPokemon';
// import PokemonStatsSection from './components/PokemonStatsSection';
// import SinglePokemon from './components/SinglePokemon';
import { getPokeByNameOrId } from "./utils/api"

function App() {
  return (
    <div className="App">
      {/* <img 
        id="dex-left" 
        src={dexLeft} 
        alt="classic pokedex from the Pokemon series"/>
      <Main />
      <img 
        id="dex-right-closed-opening" 
        src={dexRightClose}
        alt=""/>
      <img 
        id="dex-right-open-opening" 
        src={dexRightOpen} 
        alt=""/> */}
        <form onSubmit={e => {
          e.preventDefault();
          console.log(getPokeByNameOrId(e.target[0].value));
        }}>
          <input type='text' placeholder="Search for a pokemon"/>
        </form>
    </div>
  );
}

export default App;