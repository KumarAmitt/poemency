import { combineReducers } from 'redux';
import poetryReducer from './poetry';
import titleReducer from './title';

export default combineReducers({
  title: titleReducer,
  poetry: poetryReducer,
});
