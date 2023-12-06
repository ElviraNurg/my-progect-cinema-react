import { combineReducers } from 'redux';
import dataSlice from './dataSlice';
import moviesApi from './moviesApi';
export default combineReducers({
  datas: dataSlice,
  movies: moviesApi
})