import * as CONSTANTS from '../constants';

interface aluno {
  nome: string;
  rua: string;
  cep: string;
  bairro: string;
  numero: number;
  complemento: string;
  cidade: string;
  estado: string;
  file: any;
}

const INITIAL_STATE = {
  nome: '',
  rua: '',
  cep: '',
  bairro: '',
  numero: 0,
  complemento: '',
  cidade: '',
  estado: '',
  file: '',
};

export function storeReducer(state = INITIAL_STATE, action) {
  console.log(action, 'action');
  switch (action.type) {
    case CONSTANTS.BUSCAR_CEP:
      return {
        ...state,
        cep: action?.cep,
        rua: action?.logradouro,
        cidade: action?.localidade,
        estado: action?.uf,
      };
    default:
      return state;
  }
}
