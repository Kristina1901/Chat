import Moment from 'react-moment';
import s from './Message.module.css';
import { useRef, useEffect } from 'react';
const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);
  return (
    <div className={s.main}>
      <div className={msg.from === user1 ? s.own : s.another} ref={scrollRef}>
        <span className={s.text}>
          {msg.text === undefined ? msg.joke : msg.text}
        </span>
      </div>
      <small className={s.time}>
        <Moment format="MM/YYYY/DD, h:mm A" fromNow>
          {msg.createdAt.toDate()}
        </Moment>
      </small>
    </div>
  );
};
export default Message;
