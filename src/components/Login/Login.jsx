import { useContext } from "react"
import { Context } from "index"
import firebase from 'firebase/compat/app';

const Login = () => {
    const {auth} = useContext(Context)
    const login = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      const {user} = await auth.signInWithPopup(provider)
      console.log(user)
    }
    return (
    <div>
    <button onClick={login}>exit with Google</button>
    </div>
    )
}
export default Login