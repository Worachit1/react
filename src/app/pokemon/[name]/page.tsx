"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import "./../styleDetails.css";

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
  stats: Stat[];
}

export default function Page() {
  const params = useParams<{ name: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
        const data: PokemonDetails = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      }
    };

    if (params.name) {
      fetchPokemonDetails();
    }
  }, [params.name]);

  const getStat = (statName: string) => {
    return pokemonDetails?.stats.find(stat => stat.stat.name === statName)?.base_stat || "N/A";
  };

  return (
    <div className="container">
      {pokemonDetails && (
        <>
          <h1 className="pokemonName">{pokemonDetails.name}</h1>
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
            className="pokemonImage"
          />
          <h2>Details</h2>
          <div className="detailsContainer">
            <div className="detailItem"><strong>Height:</strong> {pokemonDetails.height} decimetres</div>
            <div className="detailItem"><strong>Weight:</strong> {pokemonDetails.weight} hectograms</div>
            <div className="detailItem"><strong>Base Experience:</strong> {pokemonDetails.base_experience}</div>
            <div className="detailItem"><strong>HP:</strong> {getStat('hp')}</div>
            <div className="detailItem"><strong>Attack:</strong> {getStat('attack')}</div>
            <div className="detailItem"><strong>Defense:</strong> {getStat('defense')}</div>
            <div className="detailItem"><strong>Special Attack:</strong> {getStat('special-attack')}</div>
            <div className="detailItem"><strong>Special Defense:</strong> {getStat('special-defense')}</div>
            <div className="detailItem"><strong>Speed:</strong> {getStat('speed')}</div>
          </div>
          <h2>
            <Link href="/pokemon">Back</Link>
          </h2>
        </>
      )}
    </div>
  );
}
