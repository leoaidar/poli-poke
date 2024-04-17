"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokemon_routes_1 = require("./pokemon.routes");
const router = (0, express_1.Router)();
router.use('/pokemon', pokemon_routes_1.pokemonRouter);
exports.default = router;
