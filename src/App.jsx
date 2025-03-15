import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Applications from './pages/Applications';
import ApplyJob from "./pages/ApplyJob";
import './App.css';
import RecruiterLogin from './components/RecruiterLogin';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';


const App = () => {

  const {showRecruiterLogin} = useContext(AppContext);

  return (
    <div>
     {showRecruiterLogin && <RecruiterLogin/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/applications' element={<Applications/>} />
        <Route path='/apply-job/:id' element={<ApplyJob/>} />
      </Routes>
    </div>
  )
}

export default App
