import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "@/store/reducers/handleCompanyFilter";
import { RootState } from "@/store/store";

export const VoucherFilterForm = () => {
  const dispatch = useDispatch();
  const { date } = useSelector(
    (state: RootState) => state.companyFilterReducer
  );
  const inputStyle =
    "w-[124px] text-[#ffffff80] placeholder:text-sm  focus:outline-none pb-1 pt-1 border border-[#A4AFB7] px-2 rounded-md bg-[#1A2035]";

  return (
    <form action="" className="flex">
      {/* <div className="mr-2 relative">
        <div className="absolute right-2 top-3.5">
          <Image src={input_select} alt="" />
        </div>
        <input type="text" className={inputStyle} placeholder="Last 7 Days" />
      </div> */}
      <div>
        <input
          value={date}
          onChange={(e) => {
            dispatch(setDate(e.target.value))
          }}
          className={inputStyle}
          type="date"
          placeholder="DD/MM/YY"
        />
      </div>
    </form>
  );
};
