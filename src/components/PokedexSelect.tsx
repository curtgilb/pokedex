import { useQuery } from "urql";
import { graphql } from "../gql";
import { ChangeEvent } from "react";

const pokedexes = graphql(/* GraphQL */ `
  query Versions {
    pokemon_v2_versiongroup(
      where: {
        pokemon_v2_pokedexversiongroups_aggregate: {
          count: { predicate: { _eq: 1 } }
        }
      }
    ) {
      generation_id
      name
      id
      pokemon_v2_pokedexversiongroups {
        pokedex_id
        pokemon_v2_pokedex {
          name
          id
        }
      }
    }
  }
`);

type PokedexSelectProps = {
  handlePokedexChange: (
    pokedexId: number,
    versionGroupId: number,
    generationId: number
  ) => void;
};

export function PokedexSelect({ handlePokedexChange }: PokedexSelectProps) {
  const [{ data, fetching, error }] = useQuery({ query: pokedexes });

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    const { pokedex, generation } = event.target.selectedOptions[0].dataset;
    const version = event.target.selectedOptions[0].value;
    handlePokedexChange(
      parseInt(pokedex as string),
      parseInt(version),
      parseInt(generation as string)
    );
  }

  return (
    <>
      <select
        className="pokedex-select"
        name="pokedex"
        id="pokedex-select"
        onChange={handleSelect}
      >
        {data?.pokemon_v2_versiongroup.map((version) => (
          <option
            key={version.id}
            value={version.id}
            data-pokedex={version.pokemon_v2_pokedexversiongroups[0].pokedex_id}
            data-generation={version.generation_id}
          >
            {version.name}
          </option>
        ))}
      </select>
    </>
  );
}
