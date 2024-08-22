import { PokedexSelect } from "@/features/pokedex/PokedexSelect";
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

type OutletContext = {
  pokedexId: number;
  versionGroupId: number;
  generationId: number;
};

function App() {
  // Used to fetch the right list
  const [pokedexId, setPokedexId] = useState(2);
  const [versionGroupId, setVersionGroupId] = useState(1);
  const [generationId, setGenerationId] = useState(1);

  function updatePokedex(
    pokedexId: number,
    versionGroupId: number,
    generationId: number
  ): void {
    setPokedexId(pokedexId);
    setVersionGroupId(versionGroupId);
    setGenerationId(generationId);
  }

  return (
    <>
      <header>
        <div className="nav-wrapper">
          <h1 className="logo">Pokedex</h1>

          <PokedexSelect handlePokedexChange={updatePokedex} />
        </div>
      </header>

      <main>
        <Outlet
          context={
            { pokedexId, versionGroupId, generationId } satisfies OutletContext
          }
        ></Outlet>
      </main>
      <footer></footer>
    </>
  );
}

export function useRouterContext() {
  return useOutletContext<OutletContext>();
}

export default App;
