import { useState } from "react";
import { useDispatch } from "react-redux";
// import { addNote } from "../../redux/actions/noteActions";
import  {addNoteAsync}  from "../../redux/reducers/noteReducer";
import styles from "./NoteForm.module.css";

function NoteForm() {
  // Initialize the state for the note text input
  const [notesText, setNotesText] = useState("");
  
  // Get the `dispatch` function from the Redux store
  const dispatch = useDispatch();

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch an asynchronous action to add a note with the provided text
    dispatch(addNoteAsync(notesText));
    
    // Clear the note text input
    setNotesText("");
  };

  // Render the form
  return (
    <div className={styles.noteContainer}>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="form-control mb-3"
          value={notesText}
          onChange={(e) => setNotesText(e.target.value)}
        />
        <button className="btn btn-success float-end" type="submit">Create Note</button>
      </form>
    </div>
  );
}

export default NoteForm;
