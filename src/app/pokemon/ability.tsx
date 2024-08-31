// pages/ability/[abilityName].tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface AbilityDetails {
  name: string;
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
}

export default function AbilityPage() {
  const { abilityName } = useParams<{ abilityName: string }>();
  const [abilityDetails, setAbilityDetails] = useState<AbilityDetails | null>(null);

  useEffect(() => {
    const fetchAbilityDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
        const data: AbilityDetails = await response.json();
        setAbilityDetails(data);
      } catch (error) {
        console.error("Failed to fetch ability details:", error);
      }
    };

    if (abilityName) {
      fetchAbilityDetails();
    }
  }, [abilityName]);

  return (
    <div>
      {abilityDetails ? (
        <div>
          <h1>{abilityDetails.name}</h1>
          <ul>
            {abilityDetails.effect_entries.map((entry, index) => (
              <li key={index}>
                <strong>{entry.language.name}:</strong> {entry.effect}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
