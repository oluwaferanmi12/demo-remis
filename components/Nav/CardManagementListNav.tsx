import { handleQuery } from "@/store/reducers/handleCardManagement";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const CardManagementListNav = () => {
  const dispatch = useDispatch();
  const { query } = useSelector(
    (state: RootState) => state.cardMangementReducer
  );
  return (
    <div className="flex justify-between p-6 pr-12 font-Quiet_sans">
      <div>{/* <FilterForm /> */}</div>
      {/* <div className="flex items-center">
        <div>
          <Image src={exportIcon} alt="" />
        </div>
        <p className="font-Quiet_sans text-[#D9DBE0] pl-2">Export PDF</p>
      </div> */}
      <input
        type="text"
        className="text-[#ffffff52] placeholder:text-[#ffffff52] pl-6  placeholder:text-sm  focus:outline-none pb-1 pt-1 border-b border-[#A4AFB7] px-2 w-[200px] bg-transparent "
        placeholder="SEARCH"
        onChange={(e) => {
          dispatch(handleQuery(e.target.value));
        }}
        value={query}
      />
    </div>
  );
};
