/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {View, ActivityIndicator} from 'react-native';
import {TabBar} from './src/navigations/tabNavigator';
import RouteComponent from './src/navigations';
// import ChatDemo from './src/demos';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouteComponent />
      </PersistGate>
    </Provider>
    // <ChatDemo/ >
  );
};

export default App;
