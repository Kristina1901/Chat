import { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
} from 'firebase/firestore';
import User from 'components/User/User';
import Profile from 'components/Profile/Profile';
import MessageForm from 'components/MessageForm/MessageForm';
import Message from 'components/Message/Message';
import s from './Home.module.css';
import avatar from './man.jpg';
const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [search, setSearch] = useState([]);
  const [keyword, setKeyword] = useState('');
  const arrUsers = [
    'YklieGKo6YUsMnHz8rG8C3T4iRm1',
    'nqVTMcpsQcYWiGIL5bmse1KEsG02',
    'yZjBmNVSvOfy6Qe8MeFj3Toj17U2',
  ];
  const [w, setW] = useState([]);
  const [staticList, setStaticList] = useState([]);
  const [button, setButton] = useState(false);
  const user1 = auth.currentUser.uid;
  useEffect(() => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', 'not-in', [user1]));
    const unsub = onSnapshot(q, querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push(doc.data());
     });
      setUsers(users);
      filterByID(users)
    });
    return () => unsub();
  }, []);
  const selectUser = async user => {
    setChat(user);
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));
    onSnapshot(q, querySnapshot => {
      let msgs = [];
      querySnapshot.forEach(doc => {
        msgs.push(doc.data());
       });
      setMsgs(msgs);
    });
    //  const docSnap = await getDoc(doc(db, 'lastMsg', id));
    //  if(docSnap.data()?.from !==user1) {
    //   await updateDoc(doc(db,"lastMsg", id), {unread: false})
    //  }
  };
  async function getMessageJoke() {
    let response = await fetch('https://api.chucknorris.io/jokes/random');
    if (response.status === 200) {
      let json = await response.json();
      return json.value;
    }

    throw new Error(response.status);
  }
  async function cheakStatucUser(key) {
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let arr = arrUsers.find(user => user === key);
    if (arr !== undefined) {
      let joke = await getMessageJoke();
      await addDoc(collection(db, 'messages', id, 'chat'), {
        joke,
        from: user2,
        to: user1,
        createdAt: Timestamp.fromDate(new Date()),
      });
      await setDoc(doc(db, 'lastMsg', id), {
        joke,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        unread: true,
      });
      setText('');
      getuser(user2)
    }
  }
  const setFilterValue = e => {
    e.preventDefault();
    let { filter } = e.target.elements;
    getResultSearch(filter.value);
    setKeyword(filter.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setText('');
    setTimeout(cheakStatucUser(user2), 10000);
    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true,
    });
  };
  const getResultSearch = m => {
    const k = users.filter(user =>
      user.name.toLowerCase().includes(m.toLowerCase())
    );
    setSearch(k);
  };
  const handleQuery = event => {
    setKeyword(event.target.value.toLowerCase());
    getResultSearch(event.target.value.toLowerCase());
  };
  let getuser = (num) =>{
    let arr = [...users]
    let k = num 
    let res= users.findIndex((user) => (user.uid === k))
    let talker = users.find((user) => (user.uid === k))
    if (res !== -1) {
     arr.splice(res, 1);
  }
  arr.unshift(talker)
   setW(arr)
    
  }

  let list;
  if (search.length === 0) {
    list = <div className={s.errorMessage}>User is not found</div>;
  } else {
    list = search.map(user => (
      <User
        key={user.uid}
        user={user}
        selectUser={selectUser}
        user1={user1}
        chat={chat}
        visability={visability}
      />
    ));
  }
  let companion
  if (w.length === 0) {
    companion = staticList.map(user => (
      <User
        key={user.uid}
        user={user}
        selectUser={selectUser}
        user1={user1}
        chat={chat}
        visability={visability}
      />
    ))
  }
  else {
    companion = w.map(user => (
      <User
        key={user.uid}
        user={user}
        selectUser={selectUser}
        user1={user1}
        chat={chat}
        visability={visability}
     />
    ))
  }
  function filterByID(v) {
    const doubles = arrUsers.map((num) => v.filter(user=> user.uid === num));
   setStaticList(doubles.flat())
  }
  function visability (n) {
    setButton(n)
  }
  return (
    <div className={s.container}>
    <div className={s.home}>
      <div className={button === false? s.sidebarPhone: s.sidebar }>
        <Profile setFilterValue={setFilterValue} handleQuery={handleQuery} />
        <div className={s.wrapperUser}>
          <p className={s.title}>Chats</p>
          {keyword === ''
            ? companion
            : list}
        </div>
      </div>
      {chat ? (
      <div className={button === false? s.messages : s.messagePhone}>
         <div className={s.speaker}>
         <button className={s.back} onClick={() =>visability(true)}></button>
         <div>
              <div
              style={{ 
                backgroundImage: `url(${chat.hasOwnProperty('avatar') ? chat.avatar : avatar})` 
              }} className={s.photo}/>
               {/* <div className={chat.isOnline? s.isOnline: s.offline}/> */}
              <div className={s.isOnline} />
              {chat.name}
              </div>
             </div>
            <div className={s.messagesWrapper}>
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          
        </div>
        ) : (
          <div className={s.select}>Select..</div>
        )}
    </div>
    </div>
  );
};
export default Home;
