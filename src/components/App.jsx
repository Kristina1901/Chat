import { Suspense } from 'react';
import { Routes, Route , Navigate} from 'react-router-dom';
import Navbar from "./Navbar/Navbar";
import Login from './Login/Login';
import Home from './Home/Home';
import Register from './Register/Register';
import PrivateRoute from './PrivateRoute'
import Loading from './Loading/Loading';
export const App = () => {
  return (
   <>

   <Navbar/>
   <Suspense fallback={<Loading/>}>
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
