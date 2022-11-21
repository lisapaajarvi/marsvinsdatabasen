import styles from '../../styles/Home.module.css'
import { useState } from 'react'

export default function GuineaPigNotes() {
    const [isInputVisible, setInputVisible] = useState(false);
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }
    return (
        <>
            <div className={styles.btnContainer}>
                <button
                    className={styles.button}
                    onClick={inputToggle}>
                    Add a New Guinea Pig Note
                </button>
            </div>
            {isInputVisible ? (
                <div className={styles.inputContainer}>
                    <input placeholder='Enter Guinea Pig Name'
                    className={styles.input}/>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}