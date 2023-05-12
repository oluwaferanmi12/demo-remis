import React from "react";
import { DatePicker, Space } from "antd";

export const UserDetailsFilterForm = ({
  handleDate,
  handleEndDate,
}: {
  handleDate: (value: string) => void;
  handleEndDate: (value: string) => void;
}) => {
  const { RangePicker } = DatePicker;
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
        <Space direction="vertical" size={12}>
          <RangePicker
            format={["YYYY-MM-DD", "YYYY-MM-DD"]}
            onChange={(dates, dateStrings) => {
              if (dateStrings.length) {
                handleDate(dateStrings[0]);
                handleEndDate(dateStrings[1]);
              } else {
                handleDate("");
                handleEndDate("");
              }
            }}
            className="placeholder:text-white"
          />
        </Space>
      </div>
    </form>
  );
};
