import { useState } from "react";
import { useDispatch } from "react-redux";
// import { addNote } from "../../redux/actions/noteActions";
import  {addnoteAsync}  from "../../redux/reducers/noteReducer";
import styles from "./NoteForm.module.css";

function NoteForm() {
  // Initialize the state for the note text input
  const [noteText, setNoteText] = useState("");
  
  // Get the `dispatch` function from the Redux store
  const dispatch = useDispatch();

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(noteText)
    // Dispatch an asynchronous action to add a note with the provided text
    dispatch(addnoteAsync(noteText));
    
    // Clear the note text input
    setNoteText("");
  };

  // Render the form
  return (
    <div className={styles.noteContainer}>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="form-control mb-3"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        {console.log(noteText)}
        <button className="btn btn-success float-end" type="submit">Create Note</button>
      </form>
    </div>
  );
}

export default NoteForm;
