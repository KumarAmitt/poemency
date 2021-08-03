import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';
import api from './middleware/api';

export default function configureAppStore() {
  return configureStore({
    reducer,
    middleware: [
      api,
    ],
  });
}
