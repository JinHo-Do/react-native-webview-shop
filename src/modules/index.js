import { combineReducers } from 'redux';
import initialize from './initialize';
import browse from './browse';

export default combineReducers({
  initialize,
  browse,
});
