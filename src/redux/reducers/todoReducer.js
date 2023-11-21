import customAxios from "../../customAxios";


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    todos:[
        
    ]
}

export const getInitialState = createAsyncThunk('todo/getInitialState', async () => {
    try {
      const response = await customAxios.get('/api/todos'); // Use the custom Axios instance
      return response.data;
    } catch (error) {
      console.log('axios error', error);
      throw error; // Re-throw the error for error handling in components
    }
  });

  
  
  
  
  

    export const addTodoAsync = createAsyncThunk("todo/addTodo", async (payload) => {
        try {
            const response = await customAxios.post("https://todo-jfkg.onrender.com/api/todos/", {
                
                text: payload,
                id: Math.random(), 
                completed: false,
                
            });
            
            // console.log("response data",response.data)
          return response.data; // Access response data directly
        } catch (error) {
            console.log("axios error",error)
        }
    });


// Creating Reducer using Redux Toolkit

const todoSlice = createSlice({
    name:'todo',
    initialState:initialState,
    reducers:{
        
        // this is add action
        add:(state, action)=>{
            console.log("add action")
                state.todos.push({
                    text:action.payload,
                    completed: false,
                    id: Math.random()
                })
        },
        toggle:(state, action)=>{
            state.todos.map((todo, i)=>{
                if(i===action.payload){
                    todo.completed=!todo.completed;
                }
                return todo;
            })
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getInitialState.fulfilled, (state, action)=>{
            if (Array.isArray(action.payload)) {
                state.todos = [...action.payload];
            } else {
                console.error("Data is not an array");
                // console.log("action payload",action.payload)
            }})
        .addCase(addTodoAsync.fulfilled, (state, action)=>{
            
        
            state.todos.push(action.payload);
            console.log("action payload", action.payload)
        })
    }
});

export const todoReducer=todoSlice.reducer;

export const actions = todoSlice.actions;

// selector
export const todoSelector = (state)=>state.todoReducer.todos;



// Reducer using redux

// export function todoReducer(state=initialState, action){

//     switch(action.type){
//         case ADD_TODO:
//             return {
//                 ...state,
//                 todos:[
//                     ...state.todos,
//                     {
//                         text:action.text,
//                         completed: false
//                     }
//                 ]
//             }
//         case TOGGLE_TODO:
//             return{
//                 ...state,
//                 todos: state.todos.map((todo, i)=>{
//                     if(i==action.index){
//                         todo.completed=!todo.completed
//                     }
//                     return todo;
//                 })
//             }
//         default:
//             return state;
//     }
// }