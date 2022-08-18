import s from './MessageForm.module.css';
import arrow from './arrow.png'
const MessageForm = ({handleSubmit, text, setText}) => {
    return (
        <div className={s.formContainer}>
       <form onSubmit={handleSubmit} className={s.form}>
       <input type="text" placeholder="Type your message" value={text} onChange={e => setText(e.target.value)}
       className={s.searching}
       ></input>
        <div>
            <button className={s.button}>
                <img src={arrow} width={'20px'} height={'20px'} alt='arrow'/>
            </button>
        </div>
       </form>
       </div>
    )
   }
   export default MessageForm 