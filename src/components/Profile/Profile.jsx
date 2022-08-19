import { useState, useEffect } from 'react';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import s from './Profile.module.css';
import man from './man.jpg';
import { storage, db, auth } from '../../firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
// import circle from './circle.png';
// import checked from './checked.png'
import icon from './icon.png';
const Profile = ({ setFilterValue, handleQuery }) => {
  const [img, setImg] = useState('');
  const [user, setUser] = useState({});
  // const [query, setQuery] = useState('');
  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg('');
        } catch {
          console.error();
        }
      };
      uploadImg();
    }
  }, [img]);

  return (
    <div className={s.container}>
      <div className={s.containerUser}>
        <div
        style={{ 
          backgroundImage: `url(${user.hasOwnProperty('avatar')? user.avatar : man})` 
        }}
        className={s.photo}
        />
        <div className={user.isOnline ? s.isOnline : s.offline} />
        <input
          type="file"
          accept="image/*"
          className={s.loadingPhoto}
          id="photo"
          onChange={e => setImg(e.target.files[0])}
        />
      </div>
      <div className={s.formContainer}>
        <form className={s.form} id="form" onSubmit={setFilterValue}>
          <button type="submit" className={s.buttonSubmit}>
            <img src={icon} alt="glass" width={'20px'} height={'20px'} />
          </button>
          <input
            className={s.searching}
            type="text"
            autoComplete="off"
            placeholder="Search or start new chat"
            name="filter"
            onChange={handleQuery}
          />
        </form>
      </div>
    </div>
  );
};
export default Profile;
