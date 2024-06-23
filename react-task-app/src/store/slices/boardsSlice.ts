import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalActive: false,
  boardArray: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

export const boardReducer = boardSlice.reducer;