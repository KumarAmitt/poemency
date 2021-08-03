import { combineReducers } from 'redux';
import titleReducer from './slicers/title';
import authorReducer from './slicers/author';
import uniqPoetryReducer from './slicers/uniqPoetry';
import poetryHubReducer from './slicers/poetryHub';

export default combineReducers({
  title: titleReducer,
  author: authorReducer,
  uniqPoetry: uniqPoetryReducer,
  poetryHub: poetryHubReducer,
});
