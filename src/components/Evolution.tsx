import { Pokemon_V2_Evolutionchain } from "../gql/graphql";
import { getArtworkUrl } from "../utils/utils";

export function Evolution({
  pokemon_v2_pokemonspecies,
}: Pokemon_V2_Evolutionchain) {
  <div className="evolutions">
    <h2>Evolutions</h2>
    <ol className="pokemon-evolution">
      {pokemon_v2_pokemonspecies.map((evolution) => {
        return (
          <>
            <li key={evolution.id}>
              {evolution.name}
              <div className="image-background">
                <img
                  src={getArtworkUrl(
                    "official-artwork",
                    evolution.pokemon_v2_pokemons[0]
                      .pokemon_v2_pokemonsprites[0].sprites
                  )}
                  alt={evolution.name}
                ></img>
              </div>
            </li>
          </>
        );
      })}
    </ol>
  </div>;
}
