import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState={
    todos:[
        
    ]
}

export const getInitialState = createAsyncThunk("todo/getInitialState", 
    // async (_,thunkAPI)=>{
    // // async calls.
    // try{
    //     const res = await axios.get("http://localhost:4100/api/todos")
    //     thunkAPI.dispatch(actions.setInitialState(res.data));
    // }catch(err){
    //     console.log(err);
    // }
    ()=>{
        return axios.get("https://todo-jfkg.onrender.com/api/todos");
    }
    );

    export const addTodoAsync = createAsyncThunk("todo/addTodo", async (payload) => {
        try {
          const response = await axios.post("https://todo-jfkg.onrender.com/api/todos/", {
          id: Math.random(), 
          text: payload,
            completed: false,
          });
          console.log("response data",response.data)
      
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
                    completed: false
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
            // console.log(action.payload);
            state.todos=[...action.payload.data]
        })
        .addCase(addTodoAsync.fulfilled, (state, action)=>{
            
        
            state.todos.push(action.payload);
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