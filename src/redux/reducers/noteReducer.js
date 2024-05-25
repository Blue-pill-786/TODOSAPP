import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

export const getInitialState = createAsyncThunk("notes/getInitialState", async () => {
  try {
    const response = await axios.get("https://todo-jfkg.onrender.com/api/notes");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addNoteAsync = createAsyncThunk("notes/addNote", async (payload) => {
  try {
    const response = await axios.post("https://todo-jfkg.onrender.com/api/notes/", {
      id: Math.random(),
      text: payload,
      createdOn: new Date().toDateString(),
    });
    return response.data;
  } catch (error) {
    console.error("Notes error:", error);
    throw error;
  }
});

export const deleteNoteAsync = createAsyncThunk("notes/deleteNote", async (noteId) => {
  try {
    await axios.delete(`https://todo-jfkg.onrender.com/api/notes/${noteId}`);
    return noteId;
  } catch (error) {
    console.error("Notes error:", error);
    throw error;
  }
});

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    add: (state, action) => {
      state.notes.push({
        id: Math.random(),
        text: action.payload,
        createdOn: new Date().toDateString(),
      });
    },
    remove: (state, action) => {
      const noteId = action.payload;
      state.notes = state.notes.filter(note => note.id !== noteId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialState.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
      });
  },
});

export const noteReducer = noteSlice.reducer;
export const { add, remove, addnoteAsync } = noteSlice.actions;
export const noteSelector = (state) => state.notes.notes;
