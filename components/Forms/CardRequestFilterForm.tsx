import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDate,
  clearDate,
  setEndDate,
} from "@/store/reducers/handleDateFilter";
import { RootState } from "@/store/store";
import moment from "moment";
import { DatePicker, Space } from "antd";
import {
  handleCardRequestDate,
  handleCardRequestDateEndDate,
} from "@/store/reducers/handleCardRequestFilter";
import dayjs from "dayjs"

export const CardRequestFilterForm = () => {
  const { endDate , date } = useSelector((state: RootState) => state.cardRequestReducer);
  const dispatch = useDispatch();
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
        <Space direction="vertical" size={12}>
          <RangePicker
            format={["YYYY-MM-DD", "YYYY-MM-DD"]}
            onChange={(dates, dateStrings) => {
              if (dateStrings.length) {
                dispatch(handleCardRequestDate(dateStrings[0]));
                dispatch(handleCardRequestDateEndDate(dateStrings[1]));
                return;
              } else {
                dispatch(clearDate());
              }
            }}
            className="placeholder:text-white"
          />
        </Space>
      </div>
    </form>
  );
};
