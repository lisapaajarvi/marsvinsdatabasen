import styles from '../../styles/Home.module.css'
import { app, db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react'

export default function GuineaPigNotes() {
    const [isInputVisible, setInputVisible] = useState(false);
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const dbInstance = collection(db, 'guineaPigNotes');
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    };
    const saveNote = () => {
        addDoc(dbInstance, {
            guineaPigName: name,
            guineaPigInfo: notes
        })
        .then(() => {
            setName('')
            setNotes('')
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.btnContainer}>
                <button
                    className={styles.button}
                    onClick={inputToggle}>
                    Add a New Guinea Pig Note
                </button>
            </div>
            {isInputVisible ? (
                <div className={styles.container}>
                    <input placeholder='Enter Guinea Pig Name'
                        className={styles.input}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea placeholder='Enter Guinea Pig Notes'
                        className={styles.textarea}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <button
                        className={styles.saveBtn}
                        onClick={saveNote}
                    >
                        Save Note
                    </button>
                </div>
                
            ) : (
                <></>
            )}
        </div>
    )
}