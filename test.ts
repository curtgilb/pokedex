import { GameClient, PokemonClient } from "pokenode-ts";

const api = new GameClient();
const results = await api.getVersionGroupByName("red-blue");

const pokedex = await api.getPokedexByName("kanto");

const pokeApi = new PokemonClient();
const pokemon = await pokeApi.getPokemonSpeciesByName("bulbasaur");

console.log(results);
results.pokedexes[0];
