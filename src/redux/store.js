import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import appReducer from './slices/appSlices';
import cartReducer from './slices/cartSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // or your preferred storage
};

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(
  {
    ...persistConfig,
  },
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export {store, persistor};
