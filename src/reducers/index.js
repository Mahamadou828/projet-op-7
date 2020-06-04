import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LoaderReducer from './LoaderReducer';

const rootReducer = combineReducers({
  form: formReducer,
  Loading: LoaderReducer,
});

export default rootReducer;
