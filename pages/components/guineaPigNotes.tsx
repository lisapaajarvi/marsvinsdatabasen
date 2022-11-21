/* eslint-disable react/jsx-key */
import styles from '../../styles/Home.module.css'
import { app, db } from '../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { guineaPigNote } from '../../interfaces';

export default function GuineaPigNotes() {
    const [isInputVisible, setInputVisible] = useState(false);
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [guineaPigArray, setGuineaPigArray] = useState([]);
    const dbInstance = collection(db, 'guineaPigNotes');
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    };

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setGuineaPigArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }) as any);
            })
    }

    const saveNote = () => {
        addDoc(dbInstance, {
            guineaPigName: name,
            guineaPigInfo: notes
        })
        .then(() => {
            setName('')
            setNotes('')
            getNotes()
            inputToggle()
        })
    };


    useEffect(() => {
        getNotes();
    },[]);

    return (
        <div className={styles.noteContainer}>
            {guineaPigArray.map((gp:guineaPigNote) => {
                return (
                    <div key={gp.id}>
                        <h3>{gp.guineaPigName}</h3>
                        <p>{gp.guineaPigInfo}</p>
                    </div>
                )
            })}
            <div className={styles.btnContainer}>
                <button
                    className={styles.button}
                    onClick={inputToggle}>
                    Add a New Guinea Pig Note
                </button>
            
                {isInputVisible ? (
                    <div className={styles.container}>
                        <input placeholder='Enter Guinea Pig Name'
                            className={styles.input}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <textarea placeholder='Enter Guinea Pig Notes'
                            className={styles.textarea}
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes}
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
        </div>
    )
}