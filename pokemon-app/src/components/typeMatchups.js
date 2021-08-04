export const typeJson = [
  {
    normal: {
      strongAgainst: "NONE",
      weakAgainst: "Rock, Ghost, Steel, Toad",
      resistantTo: "Ghost",
      vulnerableTo: "Fighting",
    },
  },
  {
    fighting: {
      strongAgainst: "Normal, Rock, Steel, Ice, Dark",
      weakAgainst: "Flying, Poison, Psychic, Bug, Ghost, Fairy, Toad",
      resistantTo: "Rock, Bug, Dark",
      vulnerableTo: "Flying, Psychic, Fairy",
    },
  },
  {
    flying: {
      strongAgainst: "Fighting, Bug, Grass",
      weakAgainst: "Rock, Steel, Electric, Toad",
      resistantTo: "Fighting, Ground, Bug, Grass",
      vulnerableTo: "Rock, Electric, Ice, ",
    },
  },
  {
    poison: {
      strongAgainst: "Grass, Fairy",
      weakAgainst: "Poison, Ground, Rock, Ghost, Steel, Toad",
      resistantTo: "Fighting, Poison, Grass, Fairy",
      vulnerableTo: "Ground, Psychic",
    },
  },
  {
    ground: {
      strongAgainst: "Poison, Rock, Steel, Fire, Electric",
      weakAgainst: "Flying, Bug, Grass, Toad",
      resistantTo: "Poison, Rock, Electric",
      vulnerableTo: "Water, Grass, Ice",
    },
  },
  {
    rock: {
      strongAgainst: "Flying, Bug, Fire, Ice",
      weakAgainst: "Fighting, Ground, Steel, Toad",
      resistantTo: "Normal, Flying, Poison, Fire",
      vulnerableTo: "Fighting, Ground, Steel, Water, Grass",
    },
  },
  {
    bug: {
      strongAgainst: "Grass, Psychic, Dark",
      weakAgainst: "Fighting, Flying, Poison, Ghost, Steel, Fire, Fairy, Toad",
      resistantTo: "Fighting, Ground, Grass",
      vulnerableTo: "Flying, Rock, Fire",
    },
  },
  {
    ghost: {
      strongAgainst: "Ghost, Psychic",
      weakAgainst: "Normal, Dark, Toad",
      resistantTo: "Normal, Fighting, Poison, Bug",
      vulnerableTo: "Ghost, Dark",
    },
  },
  {
    steel: {
      strongAgainst: "Rock, Ice, Fairy",
      weakAgainst: "Steel, Fire, Water, Electric, Toad",
      resistantTo:
        "Normal, Flying, Poison, Rock, Bug, Steel, Grass, Psychic, Ice, Dragon, Fairy",
      vulnerableTo: "Fighting, Ground, Fire",
    },
  },
  {
    fire: {
      strongAgainst: "Bug, Steel, Grass, Ice",
      weakAgainst: "Rock, Fire, Water, Dragon, Toad",
      resistantTo: "Bug, Steel, Fire, Grass, Ice",
      vulnerableTo: "Ground, Rock, Water",
    },
  },
  {
    water: {
      strongAgainst: "Ground, Rock, Fire",
      weakAgainst: "Water, Grass, Dragon, Toad",
      resistantTo: "Steel, Fire, Water, Ice",
      vulnerableTo: "Grass, Electric",
    },
  },
  {
    grass: {
      strongAgainst: "Ground, Rock, Water",
      weakAgainst: "Flying, Poison, Bug, Steel, Fire, Grass, Dragon, Toad",
      resistantTo: "Ground, Water, Grass, Electric",
      vulnerableTo: "Flying, Poison, Bug, Fire, Ice",
    },
  },
  {
    electric: {
      strongAgainst: "Flying, Water",
      weakAgainst: "Ground, Grass, Electric, Dragon, Toad",
      resistantTo: "Flying, Steel, Electric",
      vulnerableTo: "Ground",
    },
  },
  {
    psychic: {
      strongAgainst: "Fighting, Poison",
      weakAgainst: "Steel, Psychic, Dark, Toad",
      resistantTo: "Fighting, Psychic",
      vulnerableTo: "Bug, Ghost, Dark",
    },
  },
  {
    ice: {
      strongAgainst: "Flying, Ground, Grass, Dragon",
      weakAgainst: "Steel, Fire, Water, Ice, Toad",
      resistantTo: "Ice",
      vulnerableTo: "Fighting, Rock, Steel, Fire",
    },
  },
  {
    dragon: {
      strongAgainst: "Dragon",
      weakAgainst: "Steel, Fairy, Toad",
      resistantTo: "Fire, Water, Grass, Electric",
      vulnerableTo: "Ice, Dragon, Fairy",
    },
  },
  {
    fairy: {
      strongAgainst: "Fighting, Dragon, Dark",
      weakAgainst: "Poison, Steel, Fire, Toad",
      resistantTo: "Fighting, Bug, Dragon, Dark",
      vulnerableTo: "Poison, Steel",
    },
  },
  {
    dark: {
      strongAgainst: "Ghost, Psychic",
      weakAgainst: "Fighting, Dark, Fairy, Toad",
      resistantTo: "Ghost, Psychic, Dark",
      vulnerableTo: "Fighting, Bug, Fairy",
    },
  },
  {
    toad: {
      strongAgainst:
        "Normal, Fighting, Flying, Poison, Ground, Rock, Bug, Ghost, Steel, Fire, Water, Grass, Electric, Psychic, Ice, Dragon, Fairy, Dark",
      weakAgainst: "NONE",
      resistantTo:
        "Normal, Fighting, Flying, Poison, Ground, Rock, Bug, Ghost, Steel, Fire, Water, Grass, Electric, Psychic, Ice, Dragon, Fairy, Dark",
      vulnerableTo: "NONE",
    },
  },
];
