import axios from 'axios';
import { PokemonDataAPI } from '../models/pokemonDataAPI';
import { PokemonDetail } from '../models/pokemonDetail';
import { PokemonResponseAPI } from '../models/pokemoniResponseAPI'
import { getPokemonList, getPokemonDetails, getPokemonId } from '../services/pokeapi.service';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('PokeapiServiceTest', () => {
  
  describe('getPokemonIdTest', () => {
    it('Deveria extrair o numero do ID baseado na URL do Pokemon fornecida', () => {
      const pokemonData: PokemonDataAPI = {
        id: 1,
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
        abilities: []
      };
      expect(getPokemonId(pokemonData)).toEqual(1);
    });

    it('Deveria retornar 0 quando a  URL esta invalida', () => {
      const pokemonData: PokemonDataAPI = {
        id: 0,
        name: "invalid",
        url: "https://pokeapi.co/api/v2/pokemon/",
        abilities: []
      };
      expect(getPokemonId(pokemonData)).toEqual(0);
    });
  });

  describe('getPokemonListTest', () => {
    it('Deveria recuperar a lista de Pokemons corretamente', async () => {

      const mockPokemonListResponse: PokemonResponseAPI = {
        results: [
          { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', abilities: [] }
        ]
      };
      
      const mockPokemonDetailResponse: PokemonDetail = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          other: {
            'official-artwork': {
              front_default: 'http://bulbasaur.com/artwork.png',
            },
          },
        },
        types: [],
        abilities: [
          { ability: { name: 'overgrow', url: 'http://bulbasaur.com/ability/overgrow' }, is_hidden: false, slot: 1 },
          { ability: { name: 'chlorophyll', url: 'http://bulbasaur.com/ability/chlorophyll' }, is_hidden: true, slot: 3 }
        ],
      };
  
      mockAxios.get.mockImplementation((url) => {
        if (url === 'https://pokeapi.co/api/v2/pokemon') {
          return Promise.resolve({ data: mockPokemonListResponse });
        }
        if (url.includes('https://pokeapi.co/api/v2/pokemon/')) {
          return Promise.resolve({ data: mockPokemonDetailResponse });
        }
        return Promise.reject(new Error('not found'));
      });
  
      const pokemons = await getPokemonList();
      expect(pokemons.length).toBe(1);
      expect(pokemons[0].id).toEqual(1);
      expect(pokemons[0].name).toEqual('bulbasaur');
      expect(pokemons[0].sprite).toEqual('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
      expect(pokemons[0].abilities.length).toEqual(2);
      expect(pokemons[0].abilities[0]).toEqual('overgrow');
    });
  });


  describe('getPokemonDetailsTest', () => {
    it('Deveria buscar os detalhes parta um Pokemon especifico pelo ID', async () => {
      const pokemonDetail = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        sprites: { front_default: 'http://bulbasaur.com/sprite.jpg' },
        types: [{ type: { name: 'grass' } }],
        abilities: [{ ability: { name: 'overgrow' } }]
      };
      mockAxios.get.mockResolvedValue({ data: pokemonDetail });

      const details = await getPokemonDetails(1);
      expect(details).toEqual(pokemonDetail);
      expect(details.name).toEqual('bulbasaur');
    });
  });
});