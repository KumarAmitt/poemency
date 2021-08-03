import { combineReducers } from 'redux';
import poetryReducer from './poetry';
import titleReducer from './title';
import authorReducer from './author';
import uniqPoetryReducer from './uniqPoetry';
import poetryHubReducer from './poetryHub';

export default combineReducers({
  title: titleReducer,
  author: authorReducer,
  uniqPoetry: uniqPoetryReducer,
  poetryHub: poetryHubReducer,
  poetry: poetryReducer,
});
