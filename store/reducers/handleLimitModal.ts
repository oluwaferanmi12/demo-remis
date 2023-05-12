import { createSlice } from "@reduxjs/toolkit";

const handleLimitModal = createSlice({
  name: "limit_modal",
  initialState: {
    limitModalActive: false,
  },
  reducers: {
    showLimitModal(state) {
      state.limitModalActive = true;
    },
    hideLimitModal(state) {
      state.limitModalActive = false;
    },
  },
});

export default handleLimitModal.reducer

export const {showLimitModal , hideLimitModal} = handleLimitModal.actions