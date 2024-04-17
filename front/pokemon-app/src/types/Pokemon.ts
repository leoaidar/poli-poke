export interface Pokemon {
    id: number;
    name: string;
    sprite: string; 
    abilities: Array<{ ability: { name: string } }>;
  }
  