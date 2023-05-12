import React from "react";
import { FilterForm } from "../Forms/FilterForm";
import { CardDetailsFilterForm } from "../Forms/CardDetailsFilterForm";

export const CardDetailsNav = ({
  handleSearchValue,
  handleStartDate,
  handleEndDate,
}: {
  handleSearchValue: (value: string) => void;
  handleStartDate: (value: string) => void;
  handleEndDate: (value: string) => void;
}) => {
  return (
    <div className="flex justify-between p-6 pr-12 font-Quiet_sans">
      <div>
        <CardDetailsFilterForm handleEndDate={handleStartDate} handleStartDate={handleEndDate} />
      </div>

      <input
        type="text"
        className="text-[#ffffff52] placeholder:text-[#ffffff52] pl-6  placeholder:text-sm  focus:outline-none pb-1 pt-1 border-b border-[#A4AFB7] px-2 w-[200px] bg-transparent"
        placeholder="SEARCH"
        onChange={(e) => {
          handleSearchValue(e.target.value);
        }}
      />
    </div>
  );
};
