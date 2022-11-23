import styles from '../../styles/Home.module.css'
import { app, db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { guineaPigNote } from '../../interfaces';

export default function GuineaPigNotes() {
    const [isInputVisible, setInputVisible] = useState(false);
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [guineaPigArray, setGuineaPigArray] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');
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

    const saveEditedNote = () => {
        const collectionById = doc(db, 'guineaPigNotes', id)

        updateDoc(collectionById, {
            guineaPigName: name,
            guineaPigInfo: notes,
        })
        setName('')
        setNotes('')
        getNotes()
        setIsEdit(false)
    }

    const deleteNote = () => {
        const collectionById = doc(db, 'guineaPigNotes', id)

        deleteDoc(collectionById)
        setName('')
        setNotes('')
        getNotes()
        setIsEdit(false)
    }

    const getSingleNote = async (id:string) => {
        const singleNote = doc(db, 'guineaPigNotes', id)
        const data = await getDoc(singleNote)
        const gp = { ...data.data(), id: data.id } as guineaPigNote
        setId(id)
        setName(gp.guineaPigName)
        setNotes(gp.guineaPigInfo)
        setIsEdit(true)
    }


    useEffect(() => {
        getNotes();
        // disable ES lint to remove error from empty dependency array
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className={styles.noteContainer}>
            {!isEdit? (
            <>
            {guineaPigArray.map((gp:guineaPigNote) => {
                return (
                    <div key={gp.id} className={styles.guineaPigDiv} onClick={() => getSingleNote(gp.id)}
                >
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
            </>):(
                <div>
                    <div className={styles.container}>
                        <input 
                            className={styles.input}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <textarea 
                            className={styles.textarea}
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes}
                        />
                        <button
                            className={styles.saveBtn}
                            onClick={saveEditedNote}
                        >
                            Save Note
                        </button>
                        <button 
                            className={styles.deleteBtn}
                            onClick={deleteNote}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}