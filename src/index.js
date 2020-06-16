import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDom from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { ApolloProvider } from '@apollo/react-hooks';
import { createUploadLink } from 'apollo-upload-client';
import ApolloClient from 'apollo-boost';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const BASE_ROUTE = 'http://localhost:3030';

export const client = new ApolloClient({
  link: createUploadLink(),
  uri: `${BASE_ROUTE}/graphql`,
});

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
