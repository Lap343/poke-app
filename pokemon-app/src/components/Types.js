import "../styles/Types.css"

const Types = ({ pokemon }) => {
    return (
        <>
            {pokemon?.types.map((type, typeIndex) => (
                <span
                key={`${pokemon?.id}-${typeIndex}`}
                className={`type-name ${type?.type?.name}`}
                >
                {type?.type?.name}
                </span>
            ))}
        </>
    )
}

export default Types;