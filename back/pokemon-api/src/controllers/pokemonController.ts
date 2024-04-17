import { Request, Response, NextFunction } from 'express';
import * as PokemonService from '../services/pokeapi.service';

export const getPokemons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 50;
    const pokemonList = await PokemonService.getPokemonList(page, pageSize);
    res.json(pokemonList);
  } catch (error) {
    next(error);
  }
}

export const getPokemonDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemonId = parseInt(req.query.pokemonId as string) || 0;
    const pokemon = await PokemonService.getPokemonDetails(pokemonId);
    res.json(pokemon);
  } catch (error) {
    next(error);
  }
};


