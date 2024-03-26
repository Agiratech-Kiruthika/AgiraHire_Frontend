import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define initial state
const initialState = {
  email: '',
};

// Create a slice
const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});

// Extract action creators from the slice
export const { setEmail } = emailSlice.actions;

// Create reducer using the slice's reducer
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  emailSlice.reducer
);

// Create the Redux store using configureStore from Redux Toolkit
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore non-serializable actions related to Redux persist
      },
    }),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
