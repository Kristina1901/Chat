import s from './Loading.module.css';
const Loading = () => {
  return (
    <div className={s.ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default Loading;
