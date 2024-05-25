import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialState, addNoteAsync, deleteNoteAsync, noteSelector } from '../../redux/reducers/noteReducer';

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(noteSelector);

  useEffect(() => {
    dispatch(getInitialState());
  }, [dispatch]);

  const handleAddNote = () => {
    const noteText = prompt('Enter note text:');
    if (noteText) {
      dispatch(addNoteAsync(noteText));
    }
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNoteAsync(noteId));
  };

  return (
    <div>
      <button onClick={handleAddNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.text} <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
