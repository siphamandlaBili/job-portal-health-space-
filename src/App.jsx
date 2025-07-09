import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Applications from './pages/Applications';
import ApplyJob from "./pages/ApplyJob";
import './App.css';
import RecruiterLogin from './components/RecruiterLogin';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';
import 'quill/dist/quill.snow.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const {showRecruiterLogin, companyToken} = useContext(AppContext);
  return (
    <div>
      <ToastContainer />
      {showRecruiterLogin && <RecruiterLogin/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/applications' element={<Applications/>} />
        <Route path='/apply-job/:id' element={<ApplyJob/>} />
        <Route path='/dashboard' element={<Dashboard />}>
          {/* Nested routes go here */}
          {companyToken && (
            <>
              <Route path='add-job' element={<AddJob />} />
              <Route path='manage-jobs' element={<ManageJobs />} />
              <Route path='view-applications' element={<ViewApplications />} />
            </>
          )}
        </Route>
      </Routes>
    </div>
  )
}

export default App
