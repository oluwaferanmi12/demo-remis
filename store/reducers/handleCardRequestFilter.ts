import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const cardRequestSlice = createSlice({
  name: "card_request_slice",
  initialState: {
    query: "",
    date: "",
    endDate: "",
    currentPagination: 1,
  },
  reducers: {
    handleCardRequestQuery(state, action) {
      state.query = action.payload;
    },
    handleCardRequestDate(state, action) {
      state.date = action.payload;
    },
    handleCurrentPagination(state, action) {
      state.currentPagination = action.payload;
    },
    handleCardRequestDateEndDate(state, action) {
      state.endDate = action.payload;
    },
  },
});

export default cardRequestSlice.reducer;

export const {
  handleCardRequestDate,
  handleCardRequestQuery,
  handleCurrentPagination,
  handleCardRequestDateEndDate
} = cardRequestSlice.actions;
