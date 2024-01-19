import { Routes, Route, Link } from 'react-router-dom';
import Enterform from './pages/Enterform/EnterForm';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home'
import UserAccount from './pages/UserAccount/UserAccount';
import style from './App.module.css'
import Err from './pages/Err/Err'
import About from './components/About/About';
import Movies from './pages/Movies/Movies';
import ProtectedRouteElement from './components/ProtectedRoute/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from './store/dataSlice';
import SavedMovies from './pages/SavedMovies/SavedMovies';

function App() {
  const token=localStorage.getItem('token')
  const authorizedUser=useSelector(state => state.datas.datas.authorizedUser)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(checkToken())
},[token])
//console.log('authorizedUser ', authorizedUser);
  
  return (
    <div className="App">
      <Routes> 
          <Route path='/' element={<Home className={style.header}/>} />
          <Route path='/home' element={<Home  className={style.header}/>} />
          <Route path='/account' element={<ProtectedRouteElement element={UserAccount}  authorizedUser={authorizedUser} />}/>
          <Route path='/signup' element={<Enterform/>}/>
          <Route path='/signin' element={<Enterform/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/movies' element={<ProtectedRouteElement element={Movies} parent={'movies'} authorizedUser={authorizedUser} />}/>
          <Route path='/saved-movies' element={<ProtectedRouteElement element={SavedMovies} parent={'saved'} authorizedUser={authorizedUser} />}/>
          <Route path='*' element={<Err/>}/>
        </Routes> 
    </div>

  )
}

export default App;
