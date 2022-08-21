import React, {useState} from "react"
import {createUserWithEmailAndPassword,  GoogleAuthProvider, getAuth, signInWithPopup,} from 'firebase/auth'
import {auth, db} from '../../firebase'
import {setDoc, doc, Timestamp} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import {collection, addDoc}from 'firebase/firestore';
import s from './Register.module.css'
const Register =() => {
    let navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
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
      if (!name || !email|| ! password) {
        setData({...data, error: 'All fields are required'})
      }
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, 'users', result.user.uid), {
            uid: result.user.uid,
            name,
            email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true
        })
        let user1 = result.user.uid;
        {
        let user2 = 'nqVTMcpsQcYWiGIL5bmse1KEsG02'
        const fff = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        await addDoc(collection(db, 'messages', fff, 'chat'), {
             text: 'Hello, how are you?',
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
          });
         await addDoc(collection(db, 'messages', fff, 'chat'), {
           text: 'Hello, everything is fine, now in Lviv',
           from: user2,
           to: user1,
           createdAt: Timestamp.fromDate(new Date()),
         });
         await setDoc(doc(db, 'lastMsg', fff), {
           text: 'Hello, everything is fine, now in Lviv',
           from: user2,
           to: user2,
           createdAt: Timestamp.fromDate(new Date()),
           unread: true,
         });
        }
        { let user2 = 'yZjBmNVSvOfy6Qe8MeFj3Toj17U2'
            const fff = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
            await addDoc(collection(db, 'messages', fff, 'chat'), {
                text: 'Hey, lets meet at the bar tonight?',
                from: user2,
                to: user1,
                createdAt: Timestamp.fromDate(new Date()),
              });
              await addDoc(collection(db, 'messages', fff, 'chat'), {
               text: `ok, I'll call you later`,
               from: user1,
               to: user2,
               createdAt: Timestamp.fromDate(new Date()),
             });
             await setDoc(doc(db, 'lastMsg', fff), {
               text: `ok, I'll call you later`,
               from: user1,
               to: user2,
               createdAt: Timestamp.fromDate(new Date()),
               unread: true,
             });
            }
        ///
        { let user2 = 'YklieGKo6YUsMnHz8rG8C3T4iRm1'
        const fff = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        await addDoc(collection(db, 'messages', fff, 'chat'), {
            text: `Let's drink coffee`,
            from: user2,
            to: user1,
            createdAt: Timestamp.fromDate(new Date()),
          });
           await setDoc(doc(db, 'lastMsg', fff), {
            text: `Let's drink coffee`,
           from: user1,
           to: user2,
           createdAt: Timestamp.fromDate(new Date()),
           unread: true,
         });
        }
        setData({name: '', email: '', password: '', error: null, loading: false})
        navigate("/", { replace: true });
        } catch (error) {
        setData({...data, error: error.message, loading: false})
        
      }
    }
    async function login () {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setDoc(doc(db, 'users', result.user.uid), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
                avatar: user.photoURL
            })
            setData({name: '', email: '', password: '', error: null, loading: false})
            navigate("/", { replace: true });
            }).catch((error) => {
                setData({...data, error: error.message, loading: false})
           });
    }
    const {name, email, password, error, loading} = data
    
    return (
        <section className={s.register}>
            <div className={s.form}>
            <form onSubmit={handleSubmit}>
            <h3>Create An Account</h3>
                <div className={s.field}>
                  <label className={s.name}>Name
                    <input name="name" value={name} onChange={handleChange} className={s.nameInput} placeholder={'Name'}>
                        </input>
                    </label>
                </div>
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
                <div>
                    <button disabled={loading} className={s.customBtn}>{loading? "Creating...": "Register"}</button>
                </div>
               </form>
               <div>
                <p>or create with</p>
                <button className={s.btnGoogle} onClick={login}>
                   <div className={s.sign}></div>
                </button>
            </div>
            </div>
            </section>
    )
}
export default Register