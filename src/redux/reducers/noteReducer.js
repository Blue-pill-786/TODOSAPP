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

export const addnoteAsync = createAsyncThunk("notes/addnote", async (payload) => {
  try {
    const response = await axios.post("https://todo-jfkg.onrender.com/api/notes/", {
      id: Math.random(),
      text: payload,
    
      createdOn: new Date().toDateString(),
      
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
   console.log("Notes error",error);
  }
});
export const deletenoteAsync = createAsyncThunk("notes/deleteNotes", async (noteId) => {
    try {
        const response = await axios.delete(`https://todo-jfkg.onrender.com/api/notes/${noteId}`);
        return response.data;
    } catch (error) {
       console.log(error)
    }
});

const noteSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {
      // Add action
      add: (state, action) => {
        state.notes.push({
          text: action.payload,
          completed: false,
        });
      },
      // Delete action
      delete: (state, action) => {
        const indexToDelete = action.payload;

        console.log(action.payload)
            // state.notes.filter(indexToDelete,1)

        if (indexToDelete >= 0 && indexToDelete < state.notes.length) {
          // Use Array.filter to create a new array without the note to be deleted
          state.notes = state.notes.filter((note,index) => index !== indexToDelete);

        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getInitialState.fulfilled, (state, action) => {
          state.notes = [...action.payload];
        })
        .addCase(deletenoteAsync.fulfilled, (state, action) => {
          state.notes = action.payload; // Update the state with the result
        })
        .addCase(addnoteAsync.fulfilled, (state, action) => {
          state.notes.push(action.payload); // Push the newly added note into the array
        });
    },
  });
  
  export const noteReducer = noteSlice.reducer;
  export const actions = noteSlice.actions;
  
  export const noteSelector = (state) => state.noteReducer.notes;
  