import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: '37ac0cd8da853fc9a997da167ff22643', language: 'pt-BR' },
});

export default api;
