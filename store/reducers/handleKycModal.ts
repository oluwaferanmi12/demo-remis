import { createSlice } from "@reduxjs/toolkit";

const kycReducer = createSlice({
  name: "kyc slice",
  initialState: { kycModalActive: false },
  reducers: {
    showKycModal(state) {
      state.kycModalActive = true;
    },
    hideKycModal(state) {
      state.kycModalActive = false;
    },
  },
});

export default kycReducer.reducer

export const {showKycModal , hideKycModal } = kycReducer.actions


