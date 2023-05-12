import { createSlice } from "@reduxjs/toolkit";

const handleNoOfStaff = createSlice({
  name: "no_of_staff_modal",
  initialState: {
    noOfStaffModalActive: false,
  },
  reducers: {
    handleModalActive(state) {
      state.noOfStaffModalActive = true;
    },
    handleModalDisable(state) {
      state.noOfStaffModalActive = false;
    },
  },
});

export default handleNoOfStaff.reducer;

export const {handleModalActive, handleModalDisable} = handleNoOfStaff.actions;
