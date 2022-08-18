import { NavLink } from 'react-router-dom';
import {auth, db} from '../../firebase'
import {signOut} from 'firebase/auth'
import {updateDoc, doc} from 'firebase/firestore'
import { useContext } from 'react';
import { AuthContext } from 'context/auth';
import {useNavigate} from 'react-router-dom'
import s from './Navbar.module.css'
import Img from './logo.png'
const Navbar =() => {
  let navigate = useNavigate();
  const {user} = useContext(AuthContext)
  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false
    })
    await signOut(auth)
    navigate("../login", { replace: true });
  }
    return (
      <div className={user? s.wrapper : s.container }>
       {user?
            <>
            <button onClick={handleSignout} className={s.logout}>Logout</button> </> : 
            <> <NavLink
            to="/register"
            className={s.link}
           >
          <img src={Img} alt='logo' width={'50px'} height={'50px'}/>
          </NavLink>
          <NavLink
            to="/login"
            className={s.link}
          >
            Login
          </NavLink></>}
         
          </div>
        
      );
}
export default Navbar