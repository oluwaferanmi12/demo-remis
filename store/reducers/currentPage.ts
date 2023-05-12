import { createSlice } from "@reduxjs/toolkit";

const saveCurrentPage = createSlice({
  name: "current_page",
  initialState: {
    currentPage: "user",
    cardSubPage: false,
  },
  reducers: {
    savePage(state, action) {
      if (action.payload == "card") {
        state.cardSubPage = !state.cardSubPage;
        return;
      }
      if(action.payload == "card_request" && !state.cardSubPage ){
        state.cardSubPage = true
      }
      if(action.payload == "card_management" && !state.cardSubPage){
        state.cardSubPage = true
      }
      state.currentPage = action.payload;
    },
  },
});

export default saveCurrentPage.reducer;

export const { savePage } = saveCurrentPage.actions;
