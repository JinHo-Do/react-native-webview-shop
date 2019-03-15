import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { initializeStore } from './src/store/configureStore';

import AppNavigator from './src/navigators/AppNavigator';

export default class App extends Component {
  render() {
    const store = initializeStore();

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
