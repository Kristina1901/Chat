import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = firebase.initializeApp( {apiKey: "AIzaSyAkOVbD6X0SW9pWWHONSQHGMHGyBW-jiS4",
authDomain: "chat-react-c26d6.firebaseapp.com",
projectId: "chat-react-c26d6",
databaseURL: "http//chat-react-c26d6",
storageBucket: "chat-react-c26d6.appspot.com",
messagingSenderId: "469721592691",
appId: "1:469721592691:web:d68b498df1e8d0966c4b06",
measurementId: "G-GWNRZEZEYH"});
export const Context = createContext(null)
const auth = firebase.auth()
const firestore = firebase.firestore()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
   <Context.Provider value={{firebase, auth, firestore}}>
      <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
