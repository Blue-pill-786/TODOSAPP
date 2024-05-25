import { configureStore } from "@reduxjs/toolkit";
import { noteReducer } from "./reducers/noteReducer";
import { todoReducer } from "./reducers/todoReducer";
import { notificationReducer } from "./reducers/notificationReducer";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    note: noteReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});
