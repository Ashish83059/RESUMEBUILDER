import React from 'react'
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import { Toaster} from "react-hot-toast";
import Dashboard from './pages/Home/Dashboard';
import EditResume from './pages/ResumeUpdate/EditResume';
import LandingPage from './pages/LandingPage'; 

const App = () => {
  return (
    <>
    <div>
      <Router>
        <Routes>
          {/* {Default Routes} */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume/:resumeId" element={<EditResume />} />
        </Routes>
      </Router>
    </div>

    <Toaster 
     toastOptions={{
      className:"" ,
      style:{
        fontsize:"13px",
      },
     }}
    />
    </>
  );
};

export default App;