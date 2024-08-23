import { createSlice } from '@reduxjs/toolkit';
import { backendConfig } from '../../config';

const initialState = {
  token: localStorage.getItem('token') || '',
  userDetails: backendConfig.userDetails,
  isAuthenticated: false,
  success: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Add additional actions here as needed
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.success = true;
      state.userDetails = action.payload;// Assuming payload contains user details
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.success = true;
      state.token = action.payload; // Assuming payload contains the JWT token
    },
    loginFail: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.success = false;
      state.error = action.payload; // Assuming payload contains error details
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.success = false;
      state.token = null;
      state.userDetails = null;
      state.error = null;
    },
  },
});

export const { userLoaded, loginSuccess, loginFail, logout } = authSlice.actions;

export default authSlice.reducer;
