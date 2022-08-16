import { lazy, Suspense, useState } from 'react';
import { Routes, Route , Navigate} from 'react-router-dom';
import Navbar from "./Navbar/Navbar";
import Login from './Login/Login';

export const App = () => {
  return (
   <>
   <Suspense fallback={<div>Download...</div>}>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="*" element={<Navigate to="/" />} />          
     </Routes>
      </Suspense>
      </>
   
  );
};
