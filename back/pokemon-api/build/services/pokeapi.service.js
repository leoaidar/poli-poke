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
exports.getPokemonList = exports.getPokemonDetails = exports.getPokemonDetailsOriginal = exports.getPokemonList2 = exports.getPokemonListOriginal = exports.getPokemonId = void 0;
const axios_1 = __importDefault(require("axios"));
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
/*
// Função para obter a lista de Pokémon
export const getPokemonList = async (page: number = 0, pageSize: number = 10): Promise<Pokemon[]> => {
  try {
    const offset = page * pageSize;
    const response = await axios.get<PokemonResponseAPI>(`${POKEAPI_BASE_URL}/pokemon`, { params: { offset, limit: pageSize }});
    const pokemons: Pokemon[] = response.data.results.map((poke: PokemonDataAPI) => ({
      id: poke.id,
      name: poke.name,
      sprite: poke.sprites.front_default,
      types: poke.types.map(typeInfo => typeInfo.type.name),
      abilities: []  // Sem detalhes de habilidades aqui, apenas estrutura básica
    }));
    return pokemons;
  } catch (error) {
    console.error('Error fetching from PokeAPI', error);
    throw error;
  }
};
*/
const getPokemonId = (pokemon) => {
    const id = pokemon.url.replace(`${POKEAPI_BASE_URL}/pokemon`, "").replace("/", "").replace("/", "");
    return Number.isNaN(id) ? 0 : Number(id);
};
exports.getPokemonId = getPokemonId;
const getPokemonListOriginal = (page = 0, pageSize = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offset = page * pageSize;
        const response = yield axios_1.default.get(`${POKEAPI_BASE_URL}/pokemon`, {
            params: { offset, limit: pageSize },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching from PokeAPI', error);
        throw error; // Rethrowing the error so it can be caught by the calling function
    }
});
exports.getPokemonListOriginal = getPokemonListOriginal;
// export const getPokemonListsss = async (page: number = 0, pageSize: number = 10): Promise<Pokemon[]> => {
//   try {
//     const offset = page * pageSize;
//     const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon`, { params: { offset, limit: pageSize }});
//     const pokemons: Pokemon[] = response.data.results.map(poke => ({
//       id: getPokemonId(poke.id),
//       name: poke.name,
//       sprite: poke.sprites.front_default,
//       types: poke.types.map(typeInfo => typeInfo.type.name)
//     }));
//     return pokemons;
//   } catch (error) {
//     console.error('Error fetching from PokeAPI', error);
//     throw error;
//   }
// };
const getPokemonList2 = (page = 0, pageSize = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offset = page * pageSize;
        const response = yield axios_1.default.get(`${POKEAPI_BASE_URL}/pokemon`, { params: { offset, limit: pageSize } });
        const pokemons = response.data.results.map((poke) => ({
            id: (0, exports.getPokemonId)(poke),
            name: poke.name,
            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            abilities: []
        }));
        return pokemons;
    }
    catch (error) {
        console.error('Error getPokemonList from PokeAPI', error);
        throw error;
    }
});
exports.getPokemonList2 = getPokemonList2;
const getPokemonDetailsOriginal = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${POKEAPI_BASE_URL}/pokemon/1`, {});
        return response.data;
    }
    catch (error) {
        console.error('Error fetching from PokeAPI', error);
        throw error; // Rethrowing the error so it can be caught by the calling function
    }
});
exports.getPokemonDetailsOriginal = getPokemonDetailsOriginal;
const getPokemonDetails = (pokemonId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${POKEAPI_BASE_URL}/pokemon/${pokemonId}`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching details for Pokemon ID ${pokemonId}`, error);
        throw error;
    }
});
exports.getPokemonDetails = getPokemonDetails;
const getPokemonList = (page = 0, pageSize = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offset = page * pageSize;
        const response = yield axios_1.default.get(`${POKEAPI_BASE_URL}/pokemon`, { params: { offset, limit: pageSize } });
        const pokemons = yield Promise.all(response.data.results.map((poke) => __awaiter(void 0, void 0, void 0, function* () {
            const details = yield (0, exports.getPokemonDetails)((0, exports.getPokemonId)(poke));
            return {
                id: details.id,
                name: details.name,
                sprite: details.sprites.front_default,
                abilities: details.abilities.map(ability => ability.ability.name)
            };
        })));
        return pokemons;
    }
    catch (error) {
        console.error('Error getPokemonList from PokeAPI', error);
        throw error;
    }
});
exports.getPokemonList = getPokemonList;
