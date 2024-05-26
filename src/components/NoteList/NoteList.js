import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialState, deleteNoteAsync, noteSelector } from '../../redux/reducers/noteReducer';
import styles from './NoteList.module.css';

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(noteSelector);
 

  useEffect(() => {
    dispatch(getInitialState());
  }, [dispatch]);

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNoteAsync({ id: noteId })); 
   };

  return (
    <div className={styles.container}>
      <h2>Notes</h2>
      <ul className={styles.noteList}>
        {notes.map(note => (
          <li key={note._id} className={styles.noteItem}>
            <div className={styles.noteText}>
            {note.text} 

            </div>
            <div>
            <button onClick={() => handleDeleteNote(note._id)} className={styles.deleteButton}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
