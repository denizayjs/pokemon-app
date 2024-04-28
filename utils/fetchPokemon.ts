import axios from 'axios';

export const getPokemons = async (pageNumber: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=${(pageNumber - 1) * 20}&limit=20`,
  );

  return response?.data.results;
};

export const getPokemonByName = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  return response?.data;
};
