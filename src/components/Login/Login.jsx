import React, {useState} from "react"
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from '../../firebase'
import {doc, updateDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import s from './Login.module.css'
const Login =() => {
    let navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '', 
        error: null,
       loading: false

    })
    
    const handleChange = e => {
      setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit = async e => {
       e.preventDefault()
       setData({...data, error:null, loading: true})
      if (!email|| ! password) {
        setData({...data, error: 'All fields are required'})
      }
      try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        await updateDoc(doc(db, 'users', result.user.uid), {
            isOnline: true
        });
        setData({email: '', password: '', error: null, loading: false})
        navigate("/", { replace: true });
     
      } catch (error) {
        setData({...data, error: error.message, loading: false})
        
      }
    }
    const login = async () => {
         try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
            .then((result) => {
                 updateDoc(doc(db, 'users', result.user.uid), {
                    isOnline: true
                });
                setData({email: '', password: '', error: null, loading: false})
                navigate("/", { replace: true });
             
              })}
              catch (e)  {
                console.log(e)
           };
        
    }
    const {email, password, error, loading} = data
    
    return (
        <section className={s.register}>
           <div className={s.form}> 
           <form onSubmit={handleSubmit}>
           <h3>Loading into your Account</h3>
                <div className={s.field}>
                    <label className={s.name}>Email
                        <input name="email" value={email} onChange={handleChange} className={s.emailInput} placeholder={'Email'}>
                        </input>
                    </label>
                </div>
                <div className={s.field}>
                    <label className={s.name}>Password
                        <input name="password" value={password} onChange={handleChange} className={s.passwordInput} placeholder={'Password'}>
                         </input>
                    </label>
                </div>
                {error? <p>{error}</p>: null}
                <div className={s.field}>
                    <button disabled={loading} className={s.customBtn}>{loading? "Logging in ...": "Login"}</button>
                </div>
            </form>
            <div>
                <p>or connect with</p>
                <button className={s.btnGoogle} onClick={login}>
                    <div className={s.sign}></div>
                </button>
            </div>
            </div>
        </section>
    )
}
export default Login