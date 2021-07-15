export const typeJson = [
  {
    Normal: {
      strongAgainst: "",
      weakAgainst: "Rock, Ghost, Steel",
      resistantTo: "Ghost",
      vulnerableTo: "Fighting",
    },
  },
  {
    Fighting: {
      strongAgainst: "Normal, Rock, Steel, Ice, Dark",
      weakAgainst: "Flying, Poison, Psychic, Bug, Ghost, Fairy",
      resistantTo: "Rock, Bug, Dark",
      vulnerableTo: "Flying, Psychic, Fairy",
    },
  },
  {
    Flying: {
      strongAgainst: "Fighting, Bug, Grass",
      weakAgainst: "Rock, Steel, Electric",
      resistantTo: "Fighting, Ground, Bug, Grass",
      vulnerableTo: "Rock, Electric, Ice, ",
    },
  },
  {
    Poison: {
      strongAgainst: "Grass, Fairy",
      weakAgainst: "Poison, Ground, Rock, Ghost, Steel",
      resistantTo: "Fighting, Poison, Grass, Fairy",
      vulnerableTo: "Ground, Psychic",
    },
  },
  {
    Ground: {
      strongAgainst: "Poison, Rock, Steel, Fire, Electric",
      weakAgainst: "Flying, Bug, Grass",
      resistantTo: "Poison, Rock, Electric",
      vulnerableTo: "Water, Grass, Ice",
    },
  },
  {
    Rock: {
      strongAgainst: "Flying, Bug, Fire, Ice",
      weakAgainst: "Fighting, Ground, Steel",
      resistantTo: "Normal, Flying, Poison, Fire",
      vulnerableTo: "Fighting, Ground, Steel, Water, Grass",
    },
  },
  {
    Bug: {
      strongAgainst: "Grass, Psychic, Dark",
      weakAgainst: "Fighting, Flying, Poison, Ghost, Steel, Fire, Fairy",
      resistantTo: "Fighting, Ground, Grass",
      vulnerableTo: "Flying, Rock, Fire",
    },
  },
  {
    Ghost: {
      strongAgainst: "Ghost, Psychic",
      weakAgainst: "Normal, Dark",
      resistantTo: "Normal, Fighting, Poison, Bug",
      vulnerableTo: "Ghost, Dark",
    },
  },
  {
    Steel: {
      strongAgainst: "Rock, Ice, Fairy",
      weakAgainst: "Steel, Fire, Water, Electric",
      resistantTo:
        "Normal, Flying, Poison, Rock, Bug, Steel, Grass, Psychic, Ice, Dragon, Fairy",
      vulnerableTo: "Fighting, Ground, Fire",
    },
  },
  {
    Fire: {
      strongAgainst: "Bug, Steel, Grass, Ice",
      weakAgainst: "Rock, Fire, Water, Dragon",
      resistantTo: "Bug, Steel, Fire, Grass, Ice",
      vulnerableTo: "Ground, Rock, Water",
    },
  },
  {
    Water: {
      strongAgainst: "Ground, Rock, Fire",
      weakAgainst: "Water, Grass, Dragon",
      resistantTo: "Steel, Fire, Water, Ice",
      vulnerableTo: "Grass, Electric",
    },
  },
  {
    Grass: {
      strongAgainst: "Ground, Rock, Water",
      weakAgainst: "Flying, Poison, Bug, Steel, Fire, Grass, Dragon",
      resistantTo: "Ground, Water, Grass, Electric",
      vulnerableTo: "Flying, Poison, Bug, Fire, Ice",
    },
  },
  {
    Electric: {
      strongAgainst: "Flying, Water",
      weakAgainst: "Ground, Grass, Electric, Dragon",
      resistantTo: "Flying, Steel, Electric",
      vulnerableTo: "Ground",
    },
  },
  {
    Physic: {
      strongAgainst: "Fighting, Poison",
      weakAgainst: "Steel, Psychic, Dark",
      resistantTo: "Fighting, Psychic",
      vulnerableTo: "Bug, Ghost, Dark",
    },
  },
  {
    Ice: {
      strongAgainst: "Flying, Ground, Grass, Dragon",
      weakAgainst: "Steel, Fire, Water, Ice",
      resistantTo: "Ice",
      vulnerableTo: "Fighting, Rock, Steel, Fire",
    },
  },
  {
    Dragon: {
      strongAgainst: "Dragon",
      weakAgainst: "Steel, Fairy",
      resistantTo: "Fire, Water, Grass, Electric",
      vulnerableTo: "Ice, Dragon, Fairy",
    },
  },
  {
    Fairy: {
      strongAgainst: "Fighting, Dragon, Dark",
      weakAgainst: "Poison, Steel, Fire",
      resistantTo: "Fighting, Bug, Dragon, Dark",
      vulnerableTo: "Poison, Steel",
    },
  },
  {
    Dark: {
      strongAgainst: "Ghost, Psychic",
      weakAgainst: "Fighting, Dark, Fairy",
      resistantTo: "Ghost, Psychic, Dark",
      vulnerableTo: "Fighting, Bug, Fairy",
    },
  },
];
