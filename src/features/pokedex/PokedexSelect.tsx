import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { GameClient, NamedAPIResourceList } from "pokenode-ts";
import { toTitleCase } from "@/utils/utils";

interface PokedexSelectProps {
  selectedGameId: number;
  setGameId: Dispatch<SetStateAction<number>>;
}

export function PokedexSelect({
  selectedGameId,
  setGameId,
}: PokedexSelectProps) {
  const [gameVersions, setGameVersions] = useState<NamedAPIResourceList>();

  useEffect(() => {
    async function fetchGameVersions() {
      try {
        const api = new GameClient();
        const results = await api.listVersionGroups();
        setGameVersions(results);
      } catch (e) {
        console.log("Cannot fetch");
      }
    }
    fetchGameVersions();
  });

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {}

  return (
    <>
      <select
        className="pokedex-select"
        name="pokedex"
        id="pokedex-select"
        onChange={handleSelect}
      >
        {gameVersions?.results.map((version) => (
          <option key={version.name} value={version.url}>
            {version.name.split("-").map(toTitleCase).join("/")}
          </option>
        ))}
      </select>
    </>
  );
}
