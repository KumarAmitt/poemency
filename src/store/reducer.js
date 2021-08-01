import { combineReducers } from 'redux';
import poetryReducer from './poetry';

export default combineReducers({
  poetry: poetryReducer,
});
