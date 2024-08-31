"use client";
import React, { JSXElementConstructor } from "react";
import Link from 'next/link';
import "./style.css"

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: Pokemon[];
}
interface Pokemon {
  name: string;
  url: string;
  imageUrl?: string;
}

export default function Page() {
  //create React state
  const [pokemonData, setPokemonData] = React.useState<PokemonList>(
    {} as PokemonList
  );
  //use React useEffect
  //to load API data at firsttime
  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetch("https://pokeapi.co/api/v2/pokemon");
        const data = await result.json();
        const pokemonList: Pokemon[] = await Promise.all(
          data.results.map(async (pokemon: Pokemon) => {
            const pokemonDetails = await fetch(pokemon.url).then(res => res.json());
            return {
              ...pokemon,
              imageUrl: pokemonDetails.sprites.front_default, // Get the image URL
            };
          })
        );
        setPokemonData({ ...data, results: pokemonList });
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  const DisplayPokemonList = () => {
    //if(pokemonData != null && pokemonData.results != null)
    //if(pokemonData && pokemonData.results)
    if (pokemonData && pokemonData.results)
      return (
        <ul>
          {pokemonData.results.map((p, index) => (
            <li key={index}>
              <Link href={"/pokemon/" + p.name}>
              {p.name} <br />
              {p.imageUrl && <img src={p.imageUrl} alt={p.name} />}</Link>
            </li>
          ))}
        </ul>
      );
    else return <p>Loading...</p>;
  };

  return (
    <>
      <h2>Pokemon</h2>
      <div>
        <DisplayPokemonList />
      </div>
    </>
  );

}
