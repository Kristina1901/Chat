import { useEffect, useState } from "react"
import {db, auth} from '../../firebase'
import {collection, query, where, onSnapshot, addDoc, Timestamp, orderBy,setDoc, doc} from 'firebase/firestore'
import User from "components/User/User"
import Profile from "components/Profile/Profile"
import MessageForm from "components/MessageForm/MessageForm"
import Message from "components/Message/Message"
import s from './Home.module.css'
import avatar from './man.jpg'
const Home =() => {
    const [users, setUsers]=useState([])
    const [chat, setChat] = useState("")
    const [text, setText] = useState("")
    const [msgs, setMsgs] = useState([])
    const arrUsers =['YklieGKo6YUsMnHz8rG8C3T4iRm1', 'nqVTMcpsQcYWiGIL5bmse1KEsG02', 'yZjBmNVSvOfy6Qe8MeFj3Toj17U2']
    const user1 = auth.currentUser.uid
    useEffect(() => {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('uid', 'not-in', [user1]))
    const unsub = onSnapshot(q, querySnapshot => {
     let users =[]
     querySnapshot.forEach((doc) => {
       users.push(doc.data())
     })
     setUsers(users)
    })
    return () => unsub()
    }, [])
    const selectUser = async (user) =>{
     setChat(user)
     const user2 = user.uid
     const id = user1 > user2? `${user1 + user2}`: `${user2 + user1}`
     const msgsRef = collection(db, 'messages', id, 'chat') 
     const q = query(msgsRef, orderBy('createdAt', 'asc'))
      onSnapshot(q, querySnapshot => {
      let msgs = []
      querySnapshot.forEach(doc => {
        msgs.push(doc.data())
        
      })
      setMsgs(msgs)
   
     
     })
    //  const docSnap = await getDoc(doc(db, 'lastMsg', id));
    //  if(docSnap.data()?.from !==user1) {
    //   await updateDoc(doc(db,"lastMsg", id), {unread: false})
    //  }
    }
    async function getMessageJoke() {
      let response = await fetch(
        'https://api.chucknorris.io/jokes/random'
      );
      if (response.status === 200) {
        let json = await response.json();
        return json.value

      }
  
      throw new Error(response.status);
    }
    async function cheakStatucUser (key)  {
      const user2 = chat.uid;
      const id = user1 > user2? `${user1 + user2}`: `${user2 + user1}`
      let arr = arrUsers.find(user=> user === key)
     if (arr!== undefined) {
      
      let joke = await getMessageJoke()
      await addDoc(collection(db, 'messages', id, 'chat'), {
        joke,
        from: user2,
        to: user1,
        createdAt: Timestamp.fromDate(new Date())
      })
      await setDoc(doc(db, 'lastMsg', id), {
        joke,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()), 
        unread: true
      })
      setText('')
            
     }
    }
    const handleSubmit = async e => {
      e.preventDefault()
      const user2 = chat.uid;
      const id = user1 > user2? `${user1 + user2}`: `${user2 + user1}`
       await addDoc(collection(db, 'messages', id, 'chat'), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date())
      })
      setTimeout(cheakStatucUser(user2), 10000)
     
      
      await setDoc(doc(db, 'lastMsg', id), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()), 
        unread: true
      })
      setText('')
    }
    return (
    <div className={s.home}>
      <div className={s.sidebar}>
      <Profile/>
      <div className={s.wrapperUser}>
     <p className={s.title}>Chats</p>  
        {users.map((user) =>(<User key={user.uid} user={user} selectUser={selectUser} user1={user1} chat={chat} />))}
        </div>
        </div>
        <div className={s.messages}>{chat? <><div className={s.speaker}>
        <img src={chat.hasOwnProperty('avatar')? chat.avatar : avatar} alt="avatar" width={'50px'} height={"50px"} className={s.photo}/>
        <div className={chat.isOnline? s.isOnline: s.offline}/>
        {chat.name}</div> 
        <div className={s.messagesWrapper}>
          {msgs.length? msgs.map((msg, i) => <Message key={i} msg={msg} user1={user1}/>): null}
        </div>
        <MessageForm handleSubmit={handleSubmit} text={text} setText={setText}/></>:<div className={s.select}>Select..</div>}</div>
    </div>
    )
}
export default Home