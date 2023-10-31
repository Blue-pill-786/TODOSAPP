
import { useSelector, useDispatch } from "react-redux";
// import { deleteNote } from "../../redux/actions/noteActions";
import { actions, getInitialState } from "../../redux/reducers/noteReducer";
import { noteSelector } from "../../redux/reducers/noteReducer";
import styles from "./NoteList.module.css";
import { useEffect } from "react";

function NoteList() {
    const notes=useSelector(noteSelector);
    const dispatch=useDispatch();
    useEffect(() => {
      dispatch(getInitialState());
        // fetch("http://localhost:4100/api/todos")
        //   .then(res=>res.json())
        //     .then(parsedJson=>{
        //       console.log(parsedJson);
        //     })
        ///
        
    }, [dispatch]);
  return (
    <div className="container">
    <ul>
      {notes.map((note,index) => (
        <li className={styles.item} key={note.id}>
            {/* <p>{note.createdOn.toLocaleDateString()}</p> */}
            {console.log(note.text)}
            <p className={styles.notecontent}>{note.text}</p>
           
            <button className={"btn btn-danger "+styles.button}
            onClick={()=> dispatch(actions.delete(index))}>Delete</button>
            </li>
      ))}
    </ul>
    </div>
  );
}

export default NoteList;
