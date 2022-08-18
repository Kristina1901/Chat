import { lazy, Suspense, useState } from 'react';
import { Routes, Route , Navigate} from 'react-router-dom';
import Navbar from "./Navbar/Navbar";
import Login from './Login/Login';
import Home from './Home/Home';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import PrivateRoute from './PrivateRoute'
import s from './App.module.css'
export const App = () => {
  return (
   <>

   <Navbar/>
   <Suspense fallback={<div>Download...</div>}>
    <Routes>
    
    <Route path="/register" element={<Register />} />
    
    <Route path="/login" element={<Login />} />
    <Route path="/" element={
     <PrivateRoute redirectPath={'/register'}>
       <Home/>
    </PrivateRoute>
    }
  />
    <Route path="*" element={<Navigate to="/register" />} />          
     </Routes>
      </Suspense>
      </>
   
  );
};
