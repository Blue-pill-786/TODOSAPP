import customAxios from "../../customAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  notes: []
};

export const getInitialState = createAsyncThunk(
  'note/getInitialState',
  async () => {
    try {
      const response = await customAxios.get('/api/notes');
      return response.data;
    } catch (error) {
      console.error('Axios error:', error);
      throw error;
    }
  }
);

export const addNoteAsync = createAsyncThunk(
  "note/addNote",
  async (payload) => {
    try {
      const response = await customAxios.post(
        "https://todo-jfkg.onrender.com/api/notes/",
        {
          text: payload,
          id: Math.random(),
          createdOn: new Date().toDateString()
        }
      );
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }
);

export const deleteNoteAsync = createAsyncThunk(
  "note/deleteNote",
  async ({id}) => {
    try {
       await customAxios.delete(
        `https://todo-jfkg.onrender.com/api/notes/${id}`
      );
      
      return {id};
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }
);

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    add: (state, action) => {
      state.notes.push({
        text: action.payload,
        id: Math.random(),
        createdOn: new Date().toDateString()
      });
    },
    remove: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialState.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.notes = [...action.payload];
        } else {
          console.error("Data is not an array");
        }
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note._id !== action.payload);
      });
  }
});

export const noteReducer = noteSlice.reducer;
export const { add, remove } = noteSlice.actions;
export const noteSelector = (state) => state.note.notes;
