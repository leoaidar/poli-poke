import axios from 'axios';

export const fetchPokemons = async () => {
  const response = await axios.get('http://localhost:3001/api/pokemon');
  return response.data;
};
