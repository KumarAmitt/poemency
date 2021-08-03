import { combineReducers } from 'redux';
import entityReducer from './entity';

export default combineReducers({
  entities: entityReducer,
});
