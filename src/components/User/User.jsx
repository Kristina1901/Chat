import Img from './man.jpg'
import s from './User.module.css'
import { useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import {db} from '../../firebase'
import Moment from "react-moment"
const User =({user1, user, selectUser, chat}) => {
    const user2 = user?.uid
    const [data, setData] = useState('')
    useEffect (()=> {
    const id = user1 > user2? `${user1 + user2}`: `${user2 + user1}`
     let unsub = onSnapshot(doc(db, 'lastMsg', id), doc => {
        setData(doc.data())
     })
     return () => unsub()
    }, [])
    return ( 
    <div onClick={() => selectUser(user)} 
    className={s.profile}
    >
        <div className={s.photoStatus}>
        <img src={user.avatar || Img} alt="avatar" width={'50px'} height={'50px'} className={s.photo}/>
        {/* <div className={user.isOnline? s.online : s.offline}></div> */}
        <div className={s.online}></div>
        </div>
        <div className={s.lastMessage}>
        <h4>{user.name}</h4>
        {data&&(<p>{data.text===undefined? data.joke: data.text}</p>)}
        </div>
        <small className={s.time}>
        <Moment format="MMM DD, YYYY" fromNow>{user.createdAt.toDate()}</Moment>
    </small>
    </div>
   
    )
}
export default User