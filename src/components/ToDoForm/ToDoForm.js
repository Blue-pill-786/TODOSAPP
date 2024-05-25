import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync } from '../../redux/reducers/todoReducer';
import styles from './ToDoForm.module.css';
import { notificationSelector, resetNotification } from '../../redux/reducers/notificationReducer';

function ToDoForm() {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();
  const message = useSelector(notificationSelector);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(resetNotification());
      }, 3000);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodoAsync(todoText));
    console.log(todoText)
    setTodoText('');
  };

  return (
    <div className={styles.container}>
      {message && (
        <div className='alert alert-success' role='alert'>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className={`form-control ${styles.formControl}`}
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button className={styles.create}>Create</button>
      </form>
    </div>
  );
}

export default ToDoForm;
