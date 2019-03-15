import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../modules';

export function initializeStore() {
  return createStore(reducers, composeWithDevTools());
}
