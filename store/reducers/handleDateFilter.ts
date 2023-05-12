import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
  name: "filter_reducer",
  initialState: {
    dateSet: "",
    query: "",
    endDate: "",
    currentPagination: 1,
  },
  reducers: {
    setDate(state, action) {
      state.dateSet = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setCurrentPagination(state, action) {
      state.currentPagination = action.payload;
    },

    clearDate(state) {
      state.dateSet = "";
      state.endDate = ""
    },
  },
});

export default filterReducer.reducer;

export const { setDate, clearDate, setQuery, setCurrentPagination , setEndDate } =
  filterReducer.actions;
