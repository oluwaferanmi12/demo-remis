import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { DatePicker, Space } from "antd";
import {
  handleClearDate,
  setEndDate,
  setStartDate,
} from "@/store/reducers/handleCompanyFilter";

export const CompanyFilterForm = () => {
  const dispatch = useDispatch();
  const { date } = useSelector(
    (state: RootState) => state.companyFilterReducer
  );
  const inputStyle =
    "w-[124px] text-[#ffffff80] placeholder:text-sm  focus:outline-none pb-1 pt-1 border border-[#A4AFB7] px-2 rounded-md bg-[#1A2035]";
  const { RangePicker } = DatePicker;

  return (
    <form action="" className="flex">
      {/* <div className="mr-2 relative">
        <div className="absolute right-2 top-3.5">
          <Image src={input_select} alt="" />
        </div>
        <input type="text" className={inputStyle} placeholder="Last 7 Days" />
      </div> */}
      <div>
        <div>
          <Space direction="vertical" size={12}>
            <RangePicker
              format={["YYYY-MM-DD", "YYYY-MM-DD"]}
              onChange={(dates, dateStrings) => {
                if (dateStrings.length) {
                  dispatch(setStartDate(dateStrings[0]));
                  dispatch(setEndDate(dateStrings[1]));
                  return;
                } else {
                  dispatch(handleClearDate());
                }
              }}
              className="placeholder:text-white"
            />
          </Space>
        </div>
      </div>
    </form>
  );
};
