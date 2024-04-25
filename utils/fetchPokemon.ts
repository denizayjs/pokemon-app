import axios from 'axios';

export const getPokemons = async () => {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
  );

  return response?.data.results;
};
