import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define initial state
const initialState = {
  email: '',
  role: '',
  token: '',
  opportunitiesCount: 0, // Initialize opportunitiesCount field
};

// Create a slice for managing user and opportunitiesCount
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
    setToken(state, action) {
      state.token = action.payload;
    },
    setOpportunitiesCount(state, action) {
      state.opportunitiesCount = action.payload;
      console.log(state.opportunitiesCount);
    },
    logout(state) {
      state.email = '';
      state.role = '';
      state.token = '';
      state.opportunitiesCount = 0; // Reset opportunitiesCount on logout
    },
  },
});

// Extract action creators from the slice
export const { setEmail, setUserRole, setToken, setOpportunitiesCount, logout } = userSlice.actions;

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
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
