import { useSelector, useDispatch } from "react-redux";
import { actions, getInitialState } from "../../redux/reducers/todoReducer";
import { todoSelector } from "../../redux/reducers/todoReducer";
import styles from "./ToDoList.module.css";
import { useEffect } from "react";

function ToDoList() {
  const todos = useSelector(todoSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialState());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <ul>
        {todos.map((todo, index) => (
          <li className={styles.item} key={index}>
            <span className={styles.content}>{todo?.text}</span>
            <span className={todo?.completed ? styles.completed : styles.pending}>
              {todo?.completed ? "Completed" : "Pending"}
            </span>
            <button
              className="btn btn-warning"
              onClick={() => {
                if (todo) {
                  dispatch(actions.toggle(index));
                }
              }}
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
