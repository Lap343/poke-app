import './styles/App.css';
import dexLeft from "./assets/dex-left.png";
import dexRightOpen from "./assets/dex-right-open.png";
import dexRightClose from "./assets/dex-right-close.png";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <img 
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
        alt=""/>
    </div>
  );
}

export default App;
