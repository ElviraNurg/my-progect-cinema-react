import { Routes, Route, Link } from 'react-router-dom';
import Enterform from './pages/Enterform/EnterForm';
import { useState } from 'react';
import Home from './pages/Home/Home'
import UserAccount from './pages/UserAccount/UserAccount';
import style from './App.module.css'
import Err from './pages/Err/Err'
import About from './components/About/About';
import Movies from './pages/Movies/Movies';
import SavedMovies from './pages/SavedMovies/SavedMovies';


function App() {
  
  return (
    <div className="App">
      <Routes> 
          <Route path='/' element={<Home className={style.header}/>} />
          <Route path='/home' element={<Home  className={style.header}/>} />
          <Route path='/account' element={<UserAccount/>}/>
          <Route path='/enter' element={<Enterform/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='movies' element={<Movies parent={'movies'}/>}/>
          <Route path='/saved-movies' element={<Movies parent={'saved'}/>}/>
          <Route path='*' element={<Err/>}/>
        </Routes> 
    </div>

  )
}

export default App;
