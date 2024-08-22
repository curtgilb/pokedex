import PokedexCard from "./PokedexCard";
import { gql, useQuery } from "urql";
import { graphql } from "../gql";
import { useRouterContext } from "../App";

const query = graphql(`
  query PokemonList($pokedexId: Int!) {
    pokemon_v2_pokemonspecies(
      where: {
        pokemon_v2_pokemondexnumbers: { pokedex_id: { _eq: $pokedexId } }
      }
    ) {
      name
      id
      pokemon_v2_pokemondexnumbers(
        where: { pokemon_v2_pokedex: { id: { _eq: $pokedexId } } }
      ) {
        pokedex_number
      }
      pokemon_v2_pokemons {
        name
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
    }
  }
`);

export default function PokemonList() {
  const { pokedexId, generationId, versionGroupId } = useRouterContext();
  const [result] = useQuery({
    query: query,
    variables: { pokedexId },
  });

  const { data, fetching, error } = result;

  if (fetching) return <>Loading...</>;
  if (error) {
    console.log(error);
    return <>error..</>;
  }
  return (
    <div className="even-columns">
      {data?.pokemon_v2_pokemonspecies
        .sort(
          (a, b) =>
            a.pokemon_v2_pokemondexnumbers[0].pokedex_number -
            b.pokemon_v2_pokemondexnumbers[0].pokedex_number
        )
        .map((pokemon) => {
          console.log(pokemon);
          const url =
            pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites[0].sprites
              .other["official-artwork"].front_default;
          return (
            <PokedexCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              imageUrl={url}
              pokedexNumber={
                pokemon.pokemon_v2_pokemondexnumbers[0].pokedex_number
              }
            />
          );
        })}
    </div>
  );
}
