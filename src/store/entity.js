import { combineReducers } from 'redux';
import poetryReducer from './poetry';
import titleReducer from './title';
import authorReducer from './author';

export default combineReducers({
  title: titleReducer,
  author: authorReducer,
  poetry: poetryReducer,
});
