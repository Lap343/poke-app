import toad from "../assets/toad.png";

const Toad = {
    id: 10000,
    name: "Reactoad",
    weight: 1000,
    moves: [
        { move: {name: "Class Blast Components" } },
        { move: {name: "Hooks Shot" } },
        { move: {name: "Router to Hell" } },
        { move: {name: "Annihilate PHP" } },
        { move: {name: "Key Slay" } },
        { move: {name: "Dellstruction" } },
        { move: {name: "ALL THE MOVES" } }
    ],
    sprites: { front_default : toad },
    stats: [
        {
            base_stat: 1000,
            stat: { name: "hp"}
        },
        {
            base_stat: 1000,
            stat: { name: "attack"}
        },
        {
            base_stat: 1000,
            stat: { name: "defence"}
        },
        {
            base_stat: 1000,
            stat: { name: "special-attack"}
        },
        {
            base_stat: 1000,
            stat: { name: "special-defence"}
        },
        {
            base_stat: 1000,
            stat: { name: "speed"}
        },
    ],
    species: { name: "toad", url: ""},
    types: [{type: {name: "toad"}}]
}

export default Toad;