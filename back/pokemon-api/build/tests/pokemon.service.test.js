"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const pokeapi_service_1 = require("../services/pokeapi.service");
jest.mock('axios');
const mockAxios = axios_1.default;
describe('Pokeapi Service', () => {
    describe('getPokemonId', () => {
        it('should extract the numeric ID from the provided Pokemon URL', () => {
            const pokemonData = {
                id: 1,
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
                abilities: []
            };
            expect((0, pokeapi_service_1.getPokemonId)(pokemonData)).toEqual(1);
        });
        it('should return 0 when URL is invalid', () => {
            const pokemonData = {
                id: 0,
                name: "invalid",
                url: "https://pokeapi.co/api/v2/pokemon/",
                abilities: []
            };
            expect((0, pokeapi_service_1.getPokemonId)(pokemonData)).toEqual(0);
        });
    });
    describe('getPokemonList', () => {
        it('should fetch and format list of pokemons correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPokemonResponse = {
                results: [
                    { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/', abilities: [] },
                    { id: 2, name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/', abilities: [] }
                ]
            };
            mockAxios.get.mockResolvedValue({ data: mockPokemonResponse });
            const pokemons = yield (0, pokeapi_service_1.getPokemonList)();
            expect(pokemons.length).toBe(2);
            expect(pokemons[0].id).toEqual(1);
            expect(pokemons[0].name).toEqual('bulbasaur');
            expect(pokemons[1].id).toEqual(2);
            expect(pokemons[1].name).toEqual('ivysaur');
        }));
    });
    describe('getPokemonDetails', () => {
        it('should fetch details for a specific Pokemon ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const pokemonDetail = {
                id: 1,
                name: 'bulbasaur',
                height: 7,
                weight: 69,
                sprites: { front_default: 'http://example.com/sprite.jpg' },
                types: [{ type: { name: 'grass' } }],
                abilities: [{ ability: { name: 'overgrow' } }]
            };
            mockAxios.get.mockResolvedValue({ data: pokemonDetail });
            const details = yield (0, pokeapi_service_1.getPokemonDetails)(1);
            expect(details).toEqual(pokemonDetail);
            expect(details.name).toEqual('bulbasaur');
        }));
    });
});
// describe('Pokeapi Service', () => {
//   it('should fetch and format list of pokemons correctly', async () => {
//     const mockPokemonResponseAPI: PokemonResponseAPI = {
//       results: [
//         {
//           id: 1,
//           name: 'bulbasaur',
//           sprites: {
//             front_default: 'http://example.com/sprite.jpg'
//           },
//           types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
//         },
//         {
//           id: 2,
//           name: 'ivysaur',
//           sprites: {
//             front_default: 'http://example.com/sprite2.jpg'
//           },
//           types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
//         }
//       ]
//     };
//     mockAxios.get.mockResolvedValue({ data: mockPokemonResponseAPI });
//     const pokemons = await getPokemonList();
//     expect(pokemons).toEqual([
//       {
//         id: 1,
//         name: 'bulbasaur',
//         sprite: 'http://example.com/sprite.jpg',
//         types: ['grass', 'poison']
//       },
//       {
//         id: 2,
//         name: 'ivysaur',
//         sprite: 'http://example.com/sprite2.jpg',
//         types: ['grass', 'poison']
//       }
//     ]);
//   });
// });
// describe('Pokeapi Service Error Handling', () => {
//   it('should throw an error when the API call fails', async () => {
//     mockAxios.get.mockRejectedValue(new Error('API call failed'));
//     await expect(getPokemonList()).rejects.toThrow('Error getPokemonList from PokeAPI');
//   });
// });
// import * as PokeapiService from '../services/pokeapi.service';
// import axios from 'axios';
// jest.mock('axios');
// const mockAxios = axios as jest.Mocked<typeof axios>;
// describe('Testando conectividade com o PokeApi', () => {
//   test('Devera retornar dados apos o consumo da api', async () => {
//     const pokemons = {
//       data: {
//         results: [{ name: 'bulbasaur' }, { name: 'charmander' }],
//       },
//     };
//     mockAxios.get.mockResolvedValue(pokemons);
//     const response = await PokeapiService.getPokemonList();
//     expect(response).toEqual(pokemons.data);
//     expect(mockAxios.get).toHaveBeenCalledWith(expect.stringContaining('/pokemon'), expect.anything());
//   });
// });
// describe('Testando a lista veio com registros do PokeApi', () => {
//   test('Devera retornar uma lista com registros maior do que zero', async () => {
//     const data = await PokeapiService.getPokemonList();
//     expect(data).toBeDefined();
//     expect(data.length).toBeGreaterThan(0);
//   });
// });
