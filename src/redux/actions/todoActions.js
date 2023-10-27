
// Action constants.

export const ADD_TODO="ADD Todo";
export const TOGGLE_TODO="Toggle Todo";

// // Action Creators

export const setInitialState = (data) => ({ type: "todo/setInitialState", payload: data });
export const addTodo = (text) => ({ type: "todo/addTodo", payload: text });
export const toggleTodo = (index) => ({ type: "todo/toggleTodo", payload: index });
