import { Routes, Route, Link, useLocation } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';
//Redux-saga
function App() {
  const token = localStorage.getItem('token')
  const authorizedUser = useSelector(state => state.datas.datas.authorizedUser)
  const state=useSelector(state => state.datas.datas)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
//console.log('state ', state);
  useEffect(() => {
    !authorizedUser && token && dispatch(checkToken())
  }, [token])

  //для того, чтобы после перезагрузки остаться на той же странице
  useEffect(() => {
    const fromPage = location.state?.from?.pathname
   
    const protectedPage = fromPage === '/movies' || '/savedMovies' || '/account'
    if (authorizedUser && protectedPage) {
      navigate(fromPage);
    }else{
      console.log("Not Movies,Saved, account");
    }
  }, [authorizedUser])



  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home className={style.header} />} />
        <Route path='/home' element={<Home className={style.header} />} />
        <Route path='/account' element={<ProtectedRouteElement element={UserAccount} authorizedUser={authorizedUser} />} />
        <Route path='/signup' element={<Enterform />} />
        <Route path='/signin' element={<Enterform />} />
        <Route path='/about' element={<About />} />
        <Route path='/movies' element={<ProtectedRouteElement element={Movies} parent={'movies'} authorizedUser={authorizedUser} />} />
        <Route path='/saved-movies' element={<ProtectedRouteElement element={SavedMovies} parent={'saved'} authorizedUser={authorizedUser} />} />
        <Route path='*' element={<Err />} />
      </Routes>
    </div>

  )
}

export default App;
