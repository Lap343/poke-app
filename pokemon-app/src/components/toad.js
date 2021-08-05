import toad from "../assets/toad.png";

const Toad = {
  id: 10000,
  name: "Reactoad",
  weight: 1000,
  moves: [
    { move: { name: "Class Blast Components", type: { name: "toad" } } },
    { move: { name: "Hooks Shot", type: { name: "toad" } } },
    { move: { name: "Router to Hell", type: { name: "toad" } } },
    { move: { name: "Annihilate PHP", type: { name: "toad" } } },
    { move: { name: "Key Slay", type: { name: "toad" } } },
    { move: { name: "Dellstruction", type: { name: "toad" } } },
    { move: { name: "ALL THE MOVES", type: { name: "toad" } } },
  ],
  sprites: { front_default: toad },
  stats: [
    {
      base_stat: 1000,
      stat: { name: "hp" },
    },
    {
      base_stat: 1000,
      stat: { name: "attack" },
    },
    {
      base_stat: 1000,
      stat: { name: "defence" },
    },
    {
      base_stat: 1000,
      stat: { name: "special-attack" },
    },
    {
      base_stat: 1000,
      stat: { name: "special-defence" },
    },
    {
      base_stat: 1000,
      stat: { name: "speed" },
    },
  ],
  species: { name: "toad", url: "" },
  types: [{ type: { name: "toad" } }],
};

export default Toad;
