import { SET_ACCESS } from '../constant';

// const initialState = {
//   access: false,
//   error: '',
//   accessData: {
//     userInfo: {},
//     jwt: '',
//   },
// };

//POUR LE TEMPS DE DEVELOPEMENT NOUS SERONT AUTOMATIQUEMENT CONNECTER SUR MON COMPTE
//CETTE FONCTION DOIT ETRE IMPERATIVEMENT RETIRER AVANT MISE EN PRODUCTION

const devState = {
  access: true,
  error: '',
  accessData: {
    userInfo: {
      id: '1',
      name: 'Mahamadou ',
      surname: 'Samaké',
      photo: 'http://localhost:3030/file/image/ma_photo.png1593174714431.png',
      description: 'Developpeur de cette plateforme ))',
    },
    jwt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxfG9wbWFkb3VAZ21haWwuY29tIiwiaWF0IjoxNTkzNDQwMzkwfQ.wDTw1jJRUA4_pvWHVULz00CNMHjIR-APvYPSJLfcLWU',
  },
};
export default function AccessReducer(state = devState, action) {
  switch (action.type) {
    case SET_ACCESS:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
