import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import Layout from "./Layout";

async function fetchPokemon(key, offset = 0) {
  console.log({ offset })
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset="+offset);
  return response.json();
}

export default function Home() {
  const { data, fetchMore, canFetchMore, isFetchingMore } = useInfiniteQuery(
    "pokemon",
    fetchPokemon,
    { 
      getFetchMore: (lastPage, allPages) => {
        return allPages.length * 20
      }
    }
  );

  return (
    <Layout>
      <h2>Home</h2>
      {(data || []).map((page, index) => (
        <Fragment key={index}>
          {page.results.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.name} />
          ))}
        </Fragment>
      ))}
      <button onClick={() => fetchMore()} disabled={!canFetchMore || isFetchingMore}>
        Load more
      </button>
    </Layout>
  );
}

function PokemonCard({ pokemon }) {
  return (
    <div style={{ border: "1px solid grey", padding: 10 }}>
      {pokemon.name}
      <Link to="/about">About</Link>
    </div>
  );
}
