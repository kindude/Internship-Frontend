// src/store.ts

import { createStore, combineReducers } from 'redux';
import stringReducer from '../reducers/stringReducer';

const rootReducer = combineReducers({
  stringValue: stringReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
