import axios from 'axios';
import { Pokemon } from '../models/pokemon';
import { PokemonDetail } from '../models/pokemonDetail';
import { PokemonDataAPI } from '../models/pokemonDataAPI';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonId = (pokemon: PokemonDataAPI): number => {
  const id = pokemon.url.replace(`${POKEAPI_BASE_URL}/pokemon`,"").replace("/","").replace("/","")
  return Number.isNaN(id) ? 0 : Number(id)
}

export const getPokemonDetails = async (pokemonId: number): Promise<PokemonDetail> => {
  try {
    const response = await axios.get<PokemonDetail>(`${POKEAPI_BASE_URL}/pokemon/${pokemonId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getPokemonDetails from PokeAPI - Pokemon ID ${pokemonId}`, error);
    throw error;
  }
}

export const getPokemonList = async (page: number = 0, pageSize: number = 10): Promise<Pokemon[]> => {
  try {
    const offset = page * pageSize;
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon`, { params: { offset, limit: pageSize }});
    
    const pokemons: Pokemon[] = await Promise.all(
      response.data.results.map(async (poke: PokemonDataAPI): Promise<Pokemon> => {
        const details = await getPokemonDetails(getPokemonId(poke));
        return {
          id: details.id,
          name: details.name,
          sprite: details.sprites.front_default,
          abilities: details.abilities.map(ability => ability.ability.name)
        };
      })
    );
    //abilities: details.abilities.map(ability => ({ ability: { name: ability.ability.name } }))
    return pokemons;
  } catch (error) {
    console.error('Error getPokemonList from PokeAPI', error);
    throw error;
  }
}