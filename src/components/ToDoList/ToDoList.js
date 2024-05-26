import { useSelector, useDispatch } from "react-redux";
import { getInitialState, todoSelector, updateTodoAsync, deleteTodoAsync } from "../../redux/reducers/todoReducer";
import styles from "./ToDoList.module.css";
import { useEffect } from "react";

function ToDoList() {
  const todos = useSelector(todoSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialState());
  }, [dispatch]);

  const handleUpdate = (todo) => {
    const updatedTodo = { text: todo.text, completed: !todo.completed };
    dispatch(updateTodoAsync({ id: todo._id, updatedTodo }));
  };

  const handleDelete =(todo)=>{
    dispatch(deleteTodoAsync({ id:todo._id}));   
  }

  return (
    <div className={styles.container}>
      <ul>
        {todos.map((todo) => (
          <li className={styles.item} key={todo._id}>
            <span className={styles.content}>{todo?.text}</span>
            <span className={todo?.completed ? styles.completed : styles.pending}>
              {todo?.completed ? "Completed" : "Pending"}
            </span>
            <button
              className="btn btn-warning"
              onClick={() => handleDelete(todo)}
            >
              Delete
            </button>

            <button
              className="btn btn-warning"
              onClick={() => handleUpdate(todo)}
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
