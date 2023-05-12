import { configureStore } from "@reduxjs/toolkit";
import currentPage from "./reducers/currentPage";
import kycReducer from "./reducers/handleKycModal";
import limitReducer from "./reducers/handleLimitModal";
import noOfStaffReducer from "./reducers/handleNoOfStaff";
import filterReducer from "./reducers/handleDateFilter";
import companyFilterReducer from "./reducers/handleCompanyFilter";
import resetPinReducer from "./reducers/handleResetPin";
import cardRequestReducer from "./reducers/handleCardRequestFilter";
import cardMangementReducer from "./reducers/handleCardManagement";
import companyReducer from "./reducers/handleCompanyFilter";

const store = configureStore({
  reducer: {
    kycReducer,
    currentPage,
    limitReducer,
    noOfStaffReducer,
    filterReducer,
    companyFilterReducer,
    resetPinReducer,
    cardRequestReducer,
    cardMangementReducer,
    companyReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
