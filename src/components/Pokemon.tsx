import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { useRouterContext } from "../App";
import { graphql } from "../gql";
import { capitalize } from "../utils/utils";
import { Loader } from "./Loader";

const query = graphql(`
  query Pokemon($pokemonId: Int!, $generationId: Int!, $versionGroupId: Int!) {
    pokemon_v2_pokemonspeciesflavortext(
      where: {
        pokemon_v2_version: { version_group_id: { _eq: $versionGroupId } }
        pokemon_species_id: { _eq: $pokemonId }
      }
    ) {
      pokemon_v2_version {
        version_group_id
        name
      }
      flavor_text
    }
    pokemon_v2_pokemon(where: { id: { _eq: $pokemonId } }) {
      name
      id
      height
      weight
      pokemon_species_id
      pokemon_v2_pokemontypes(
        where: { pokemon_v2_type: { generation_id: { _eq: $generationId } } }
      ) {
        pokemon_v2_type {
          name
        }
        type_id
      }
      pokemon_v2_pokemonmoves(
        where: {
          version_group_id: { _eq: $versionGroupId }
          pokemon_v2_move: { generation_id: { _eq: $generationId } }
          pokemon_v2_movelearnmethod: { name: { _eq: "level-up" } }
        }
        order_by: { level: asc }
      ) {
        id
        level
        pokemon_v2_move {
          accuracy
          name
          power
          pp
          priority
          pokemon_v2_moveeffect {
            pokemon_v2_moveeffecteffecttexts(
              where: { language_id: { _eq: 9 } }
            ) {
              effect
              short_effect
            }
          }
          pokemon_v2_moveflavortexts(
            where: {
              language_id: { _eq: 9 }
              version_group_id: { _eq: $versionGroupId }
            }
          ) {
            flavor_text
            version_group_id
          }
          pokemon_v2_movenames(where: { language_id: { _eq: 9 } }) {
            name
          }
          pokemon_v2_type {
            name
            id
          }
          pokemon_v2_movedamageclass {
            name
            id
          }
        }
        pokemon_v2_movelearnmethod {
          name
        }
      }
      pokemon_v2_pokemonstats {
        pokemon_v2_stat {
          name
        }
        effort
        base_stat
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies(
            where: { generation_id: { _eq: $generationId } }
          ) {
            name
            id
            order
            pokemon_v2_pokemons(distinct_on: pokemon_species_id) {
              id
              pokemon_v2_pokemonsprites {
                sprites
              }
              pokemon_species_id
            }
          }
        }
        pokemon_v2_pokemonspeciesdescriptions(
          where: { language_id: { _eq: 9 } }
        ) {
          description
        }
      }
    }
  }
`);
export function Pokemon() {
  const { id } = useParams();

  const { generationId, versionGroupId } = useRouterContext();
  const [result] = useQuery({
    query,
    variables: {
      generationId,
      versionGroupId,
      pokemonId: parseInt(id as string),
    },
  });
  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  const pokemon = data?.pokemon_v2_pokemon[0];
  console.log(pokemon);
  return (
    <div className="pokemon-detail">
      <h1 className="pokemon-name">{pokemon?.name}</h1>
      <div className="pokemon-detail-layout">
        <img
          className="pokemon-image"
          src={
            pokemon?.pokemon_v2_pokemonsprites[0].sprites.other[
              "official-artwork"
            ].front_default
          }
        ></img>
        <div className="description">
          <h2>Description</h2>
          <p>
            {Math.round((pokemon?.weight as number) / 4.536)} lbs |{" "}
            {Math.round((pokemon?.height as number) * 3.937)} inches
          </p>
          <p></p>
          <ul className="pokemon-type-list">
            {pokemon?.pokemon_v2_pokemontypes.map((type) => {
              const typeName = type.pokemon_v2_type?.name;
              return (
                <li className={`pokemon-type ${typeName}`} key={type.type_id}>
                  {capitalize(typeName as string)}
                </li>
              );
            })}
          </ul>
          <p className="description-text">
            {data?.pokemon_v2_pokemonspeciesflavortext.map((text) => {
              const versionsNumber =
                data?.pokemon_v2_pokemonspeciesflavortext.length > 1;
              return (
                <p>
                  {text.flavor_text}{" "}
                  {versionsNumber &&
                    `(${capitalize(text.pokemon_v2_version?.name as string)})`}
                </p>
              );
            })}
          </p>
        </div>
        <div className="evolutions">
          <h2>Evolutions</h2>
          <ol className="pokemon-evolution">
            {pokemon?.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies.map(
              (evolution) => {
                console.log(evolution);
                return (
                  <>
                    <li key={evolution.id}>
                      <p>{capitalize(evolution.name)}</p>

                      <img
                        src={
                          evolution.pokemon_v2_pokemons[0]
                            .pokemon_v2_pokemonsprites[0].sprites.other[
                            "official-artwork"
                          ].front_default
                        }
                        alt={evolution.name}
                      ></img>
                    </li>
                  </>
                );
              }
            )}
          </ol>
        </div>
        <div className="moves">
          <h2>Moves</h2>
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Name</th>
                <th>Type</th>
                <th>Damage Class</th>
                <th>Description</th>
                <th>Accuracy</th>
                <th>PP</th>
              </tr>
            </thead>
            <tbody>
              {pokemon?.pokemon_v2_pokemonmoves.map((move) => {
                return (
                  <tr key={move.id}>
                    <td>{move.level}</td>
                    <td className="bold">
                      {move.pokemon_v2_move?.pokemon_v2_movenames[0].name}
                    </td>
                    <td>
                      <div
                        className={`pokemon-type ${move.pokemon_v2_move?.pokemon_v2_type?.name}`}
                      >
                        {capitalize(
                          move.pokemon_v2_move?.pokemon_v2_type?.name as string
                        )}
                      </div>
                    </td>
                    <td>
                      {capitalize(
                        move.pokemon_v2_move?.pokemon_v2_movedamageclass
                          ?.name as string
                      )}
                    </td>
                    <td>
                      {move.pokemon_v2_move?.pokemon_v2_moveflavortexts[0] &&
                        move.pokemon_v2_move?.pokemon_v2_moveflavortexts[0]
                          .flavor_text}
                      {
                        move.pokemon_v2_move?.pokemon_v2_moveeffect
                          ?.pokemon_v2_moveeffecteffecttexts[0]["short_effect"]
                      }
                    </td>
                    <td>{move.pokemon_v2_move?.accuracy}</td>
                    <td>{move.pokemon_v2_move?.pp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
