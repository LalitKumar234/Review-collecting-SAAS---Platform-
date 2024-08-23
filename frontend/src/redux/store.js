import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from './reducers/authSlice'

const reducer = combineReducers({
  auth: authReducer
})
const store = configureStore({
  reducer
})
export default store;