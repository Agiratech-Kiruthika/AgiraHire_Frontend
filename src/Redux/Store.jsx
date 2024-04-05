import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define initial state
const initialState = {
  email: '',
  role: '',
};

// Create a slice for managing user email and role
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setUserRole(state, action) {
      state.role = action.payload;
    },
  },
});

// Extract action creators from the slice
export const { setEmail, setUserRole } = userSlice.actions;

// Create a persisted reducer
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  userSlice.reducer
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
