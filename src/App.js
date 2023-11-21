import { Routes, Route, Link } from 'react-router-dom';
import Enterform from './components/Enterform/EnterForm';

import Home from './components/Home/Home'
import Header from './components/header/Header';
function App() {
  return (

    <div className="App">
      
    <Home/>
         {/* <nav className='nav'>
          <li className='nav-item'>
            <Link to="/" >Home</Link>
          </li>
        </nav>   */}
        {/* <Routes>
          <Route path="/Enter" element={<Enterform />} />
          <Route path='/' element={<Home />} />
        </Routes> */}
     
 
      
    </div>

  )
}

export default App;
