import {
  configureStore,
  applyMiddleware,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
//import {config, call} from './middleware';
import {storeReducer} from './reducers';
import {useDispatch} from 'react-redux';

//applyMiddleware(call, config);

export const store = configureStore({
  reducer: {
    store: storeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
