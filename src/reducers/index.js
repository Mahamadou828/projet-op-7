import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LoaderReducer from './LoaderReducer';
import ErrorReducer from './ErrorReducer';
import AccessReducer from './AccessReducer';

const rootReducer = combineReducers({
  form: formReducer,
  Loading: LoaderReducer,
  Error: ErrorReducer,
  Access: AccessReducer,
});

export default rootReducer;
