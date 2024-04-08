import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define initial state
const initialState = {
  email: '',
  role: '',
  token: '', // Added token field
};

// Create a slice for managing user email, role, and token
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
    setToken(state, action) { // Added setToken reducer
      state.token = action.payload;
    },
    logout(state) {
      state.email = '';
      state.role = '';
      state.token = '';
    },
  },
});

// Extract action creators from the slice
export const { setEmail, setUserRole, setToken, logout } = userSlice.actions;

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
