import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://back-app-2222.herokuapp.com/',
});

export const buscaCep = axios.create({
  baseURL: `https://viacep.com.br/ws`,
});
