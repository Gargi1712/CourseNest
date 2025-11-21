import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
import CoursePlayer from './pages/CoursePlayer';
import MyCourses from './pages/MyCourses';
import About from './pages/About'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Hero /><Home /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  
        <Route path="/payment" element={ <ProtectedRoute> <Payment />
            </ProtectedRoute> }/>
        <Route path="/my-courses" element={<MyCourses />} /> 
        <Route path="/course/:id" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
