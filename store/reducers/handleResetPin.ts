import { createSlice } from "@reduxjs/toolkit";

const handleResetPin = createSlice({
  name: "reset_pin",
  initialState: {
    resetPinModalActive: false,
  },
  reducers: {
    showResetPinModal(state) {
      state.resetPinModalActive = true;
    },
    hideResetPinModal(state) {
      state.resetPinModalActive = false;
    },
  },
});

export default handleResetPin.reducer;

export const { showResetPinModal , hideResetPinModal } = handleResetPin.actions;
