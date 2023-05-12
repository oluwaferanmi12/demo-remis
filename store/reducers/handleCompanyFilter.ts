import { createSlice } from "@reduxjs/toolkit";

const companyFilter = createSlice({
  name: "company_filter",
  initialState: {
    date: "",
    query: "",
    currentPagination: 1,
    startDate: "",
    endDate: "",
  },
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    setCurrentPagination(state, action) {
      state.currentPagination = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    handleClearDate(state) {
      state.startDate = "";
      state.endDate = "";
    },
  },
});

export default companyFilter.reducer;
export const {
  setDate,
  setQuery,
  setCurrentPagination,
  setEndDate,
  setStartDate,
  handleClearDate
} = companyFilter.actions;
