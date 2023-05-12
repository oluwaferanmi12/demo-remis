import { createSlice } from "@reduxjs/toolkit";

const handleCardManageMent = createSlice({
  name: "handleCardManagement",
  initialState: {
    query: "",
    currentPagination: 1,
  },
  reducers: {
    handleQuery(state, action) {
      state.query = action.payload;
    },
    handleCurrentPagination(state, action) {
      state.currentPagination = action.payload;
    },
  },
});

export default handleCardManageMent.reducer;
export const { handleQuery, handleCurrentPagination } =
  handleCardManageMent.actions;
