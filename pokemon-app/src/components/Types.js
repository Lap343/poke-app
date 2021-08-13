import "../styles/Types.css";
import { capitalize } from "../utils";

const Types = ({ pokemon }) => {
  return (
    <>
      {pokemon?.types.map((type, typeIndex) => (
        <span
          key={`${pokemon?.id}-${typeIndex}`}
          className={`type-name ${type?.type?.name}`}
        >
          {capitalize(type?.type?.name)}
        </span>
      ))}
    </>
  );
};

export default Types;
