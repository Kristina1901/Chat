import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
const firebaseConfig =  {apiKey: "AIzaSyAkOVbD6X0SW9pWWHONSQHGMHGyBW-jiS4",
authDomain: "chat-react-c26d6.firebaseapp.com",
projectId: "chat-react-c26d6",
databaseURL: "http//chat-react-c26d6.firebaseio.com",
storageBucket: "chat-react-c26d6.appspot.com",
messagingSenderId: "469721592691",
appId: "1:469721592691:web:d68b498df1e8d0966c4b06",
measurementId: "G-GWNRZEZEYH"}
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)