import customAxios from "../../customAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: []
};

export const getInitialState = createAsyncThunk(
  'todo/getInitialState',
  async () => {
    try {
      const response = await customAxios.get('/api/todos');
      return response.data;
    } catch (error) {
      console.error('Axios error:', error);
      throw error;
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todo/addTodo",
  async (payload) => {
    try {
      const response = await customAxios.post(
        "https://todo-jfkg.onrender.com/api/todos/",
        {
          text: payload,
          id: Math.random(),
          completed: false
        }
      );
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, updatedTodo }) => {
    try {
      const response = await customAxios.put(
        `https://todo-jfkg.onrender.com/api/todos/${id}`,
        updatedTodo
      );
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }
);

export const deleteTodoAsync =createAsyncThunk(
  "todo/deleteTodo",
  async (id) => {
    try {
      const response = await customAxios.delete(
        `https://todo-jfkg.onrender.com/api/todos/${id}`
        );
        return response.data;
        } catch (error) {
          console.error("Axios error:", error);
          throw error;
          }
          }

)

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action) => {
      state.todos.push({
        text: action.payload,
        completed: false,
        id: Math.random()
      });
    },
    toggle: (state, action) => {
      state.todos.map((todo, i) => {
        if (i === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialState.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.todos = [...action.payload];
        } else {
          console.error("Data is not an array");
        }
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload._id);
      });
  }
});

export const todoReducer = todoSlice.reducer;
export const { add, toggle } = todoSlice.actions;
export const todoSelector = (state) => state.todo.todos;
