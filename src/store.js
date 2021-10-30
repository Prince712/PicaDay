import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const composeEnhancers = composeWithDevTools({
  realtime: false,
  port: 8000,
});

const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  // whitelist: ['addPost'],
  // timeout: null, //for persist time out error coming on device...
  // // Blacklist (Don't Save Specific Reducers)
  // blacklist: [],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk, logger)),
);

export const persistor = persistStore(store, {}, () => {
  console.log('callbakc sync store', store);
});
