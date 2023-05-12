import React from "react";
import Image from "next/image";
import input_select from "../../public/ICONS/SVG/input-select.svg";
import search_icon from "../../public/ICONS/SVG/search-icon.svg";
import { FilterForm } from "../Forms/FilterForm";
import { CompanyDetailsFilterForm } from "../Forms/CompanyDetailsFilterForm";

export const CompanyDetailsNav = ({
  headerText = "",
  handleSearchValue,
  handleStartDate , 
  handleEndDate,
  currentSearchValue,
}: {
  handleStartDate: (value: string) => void;
  handleEndDate: (value: string) => void;
  headerText?: string;
  handleSearchValue?: (value: string) => void;
  currentSearchValue?: string;
}) => {
  const inputStyle =
    "w-[124px] text-[#ffffff80] placeholder:text-sm  focus:outline-none pb-1 pt-1 border border-[#A4AFB7] px-2 rounded-md bg-[#1A2035]";

  const searchStyle = "";
  return (
    <div className="p-6 pr-12 font-Quiet_sans">
      <div className="text-[#9299A8] text-2xl font-semibold ">{headerText}</div>

      <div className="flex justify-between mt-4">
        <div >
          <CompanyDetailsFilterForm handleStartDate={handleStartDate} handleEndDate={handleEndDate}  />
        </div>

        <form action="">
          <div className="relative">
            <div className="absolute top-3">
              <Image src={search_icon} alt="" />
            </div>
            <input
              type="text"
              value={currentSearchValue}
              onChange={(e) => {
                handleSearchValue && handleSearchValue(e.target.value);
              }}
              className="text-[#ffffff52] placeholder:text-[#ffffff52] pl-6  placeholder:text-sm  focus:outline-none pb-1 pt-1 border-b border-[#A4AFB7] px-2 w-[200px] bg-transparent "
              placeholder="SEARCH"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
