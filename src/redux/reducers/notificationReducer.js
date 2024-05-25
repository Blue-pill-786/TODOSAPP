import { createSlice } from '@reduxjs/toolkit';
import { add } from './todoReducer'; // Import the specific action you need

const initialState = {
  message: ""
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: (state) => {
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(add, (state) => {
      state.message = "Todo is created";
    });
  }
});

export const notificationReducer = notificationSlice.reducer;

export const resetNotification = notificationSlice.actions.reset;

export const notificationSelector = (state) => state.notification.message;
