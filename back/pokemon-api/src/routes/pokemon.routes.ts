import express from 'express';
import * as PokeapiService from '../services/pokeapi.service';

export const pokemonRouter = express.Router();

pokemonRouter.get('/', async (req, res, next) => {
  try {
    const page: number = parseInt(req.query.page as string) || 0;
    const pageSize: number = parseInt(req.query.pageSize as string) || 10;
    const pokemonList = await PokeapiService.getPokemonList(page, pageSize);
    res.json(pokemonList);
  } catch (error) {
    next(error);
  }
});

pokemonRouter.get('/:id', async (req, res, next) => {
  try {
    const pokemonId = parseInt(req.params.id);
    if (isNaN(pokemonId)) {
      res.status(400).send({ message: 'Pokemon ID invalido!' });
      return;
    }
    const pokemon = await PokeapiService.getPokemonDetails(pokemonId);
    res.json(pokemon);
  } catch (error) {
    next(error);
  }
});