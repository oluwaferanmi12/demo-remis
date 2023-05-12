import { createSlice } from "@reduxjs/toolkit";

const handleCompanyReducer = createSlice({
  name: "handleCompanyReducer",
  initialState: {
    query: "",
    currentPagination: "",
    startDate: "",
    endDate: "",
  },
  reducers: {
    handleQuery(state, action) {
      state.query = action.payload;
    },
    handleCurrentPagination(state, action) {
      state.currentPagination = action.payload;
    },
    handleStartDate(state, action) {
      state.startDate = action.payload;
    },
    handleEndDate(state, action) {
      state.endDate = action.payload;
    },
    handleClearDate(state) {
      state.startDate = "";
      state.endDate = "";
    },
  },
});

export default handleCompanyReducer.reducer;

export const {
  handleQuery,
  handleCurrentPagination,
  handleStartDate,
  handleEndDate,
  handleClearDate
} = handleCompanyReducer.actions;
