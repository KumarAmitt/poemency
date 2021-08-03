import { combineReducers } from 'redux';
import poetryReducer from './poetry';
import titleReducer from './title';
import authorReducer from './author';
import uniqPoetryReducer from './uniqPoetry';

export default combineReducers({
  title: titleReducer,
  author: authorReducer,
  uniqPoetry: uniqPoetryReducer,
  poetry: poetryReducer,
});
