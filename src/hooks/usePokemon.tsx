import { useEffect, useState } from "react";

interface Props {
  id: number;
}

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

export const usePokemon = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const getPokemonById = async (id: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    setPokemon({
      id: id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });
  };

  useEffect(async () => {}, []);

  return {
    pokemon,
  };
};
