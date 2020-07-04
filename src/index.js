import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDom from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const BASE_ROUTE = 'http://localhost:3030';
const SECRET_KEY = 'x66S6Vn5BXcUU64iv3xDw';

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const client = new ApolloClient({
  uri: `${BASE_ROUTE}/graphql`,
  request: (operation) => {
    const date = new Date();
    const {
      access,
      accessData: { jwt },
    } = store.getState().Access;
    operation.setContext({
      headers: {
        authorization: access
          ? jwt
          : `${SECRET_KEY}?${date.getDate()}?AUTH_ACCESS`,
        accessWasSend: access,
      },
    });
  },
});

// export const socketConnection = socketIoClient(BASE_ROUTE);

ReactDom.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <AppContainer>
        <App />
      </AppContainer>
    </ApolloProvider>
  </Provider>,
  document.getElementById('app')
);
