export interface PokemonDataAPI {
    id: number;
    name: string;
    url: string;
    abilities: Array<{
      ability: {
          name: string;
      };
    }>;
  }