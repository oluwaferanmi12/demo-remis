import React from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from "antd";

export const CompanyDetailsFilterForm = ({
  handleStartDate,
  handleEndDate,
}: {
  handleStartDate: (value: string) => void;
  handleEndDate: (value: string) => void;
}) => {
  
  const { RangePicker } = DatePicker;
  return (
    <form action="" className="flex relative">
      <div>
        <Space direction="vertical" size={12}>
          <RangePicker
            format={["YYYY-MM-DD", "YYYY-MM-DD"]}
            onChange={(dates, dateStrings) => {
              if (dateStrings.length) {
                handleStartDate(dateStrings[0]);
                handleEndDate(dateStrings[1]);
              } else {
                handleStartDate("");
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
