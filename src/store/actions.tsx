import {buscaCep} from '../api';
import * as CONSTANTS from '../constants';

export const searchCep = async (cep: string) => {
  return {
    type: CONSTANTS.BUSCAR_CEP,
    payload: {
      request: {
        method: 'GET',
        url: `https://viacep.com.br/ws/${cep}/json`,
      },
    },
  };
};
