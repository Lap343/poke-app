import { typeJson } from "./typeMatchups";
import "../styles/TypeCheck.css";
import { capitalize } from "../utils";

const TypeCheck = ({ pokemon }) => {
  let type = [];

  for (let i = 0; i < pokemon.types.length; i++) {
    type.push(pokemon.types[i].type.name);
  }

  const typeReturn = (type) => {
    let typeArray = [];

    for (let i = 0; i < type.length; i++) {
      for (let j = 0; j < typeJson.length; j++) {
        if (type[i] === Object.keys(typeJson[j])[0]) {
          typeArray.push(
            <div className={`type-details-${i}`}>
              <div>{capitalize(type[i])}</div>
              <div>{typeJson[j][type[i]].strongAgainst}</div>
              <div>{typeJson[j][type[i]].weakAgainst}</div>
              <div>{typeJson[j][type[i]].resistantTo}</div>
              <div>{typeJson[j][type[i]].vulnerableTo}</div>
            </div>
          );
        }
      }
    }
    typeArray.map((item) => <li key={item}>{item}a</li>);
    return typeArray;
  };
  return (
    <div className="type-check">
      <div className="type-title">
        <div>Type</div>
        <div>Srong Against</div>
        <div>Week Against</div>
        <div>Resistant To</div>
        <div>Vulnerable To</div>
      </div>
      {typeReturn(type)}
    </div>
  );
};

export default TypeCheck;
