import PokedexCard from "./components/PokedexCard";
import { gql, useQuery } from "urql";

const query = gql`
  query MyQuery2 {
    pokemon_v2_pokemonspecies(
      where: { pokemon_v2_pokemondexnumbers: { pokedex_id: { _eq: 7 } } }
    ) {
      name
      pokemon_v2_pokemondexnumbers(where: { pokedex_id: { _eq: 7 } }) {
        pokedex_number
      }
      pokemon_v2_pokemons {
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
    }
    pokemon_v2_type {
      name
    }
  }
`;

function App() {
  const [result] = useQuery({
    query: query,
  });

  const { data, fetching, error } = result;

  if (fetching) return <>Loading...</>;
  if (error) return <>error..</>;
  return (
    <>
      <header>
        <div className="nav-wrapper">
          Pokedex
          <nav></nav>
        </div>
      </header>
      <main>
        {data.pokemon_v2_pokemonspecies.map((pokemon) => {
          console.log(pokemon);
          const images = JSON.parse(
            pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites[0].sprites
          );
          console.log(images);
          const url = images.other["official-artwork"].front_default.replace(
            "/media/",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/"
          );

          return (
            <PokedexCard
              name={pokemon.name}
              imageUrl={url}
              pokedexNumber={
                pokemon.pokemon_v2_pokemondexnumbers[0].pokedex_number
              }
            />
          );
        })}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
