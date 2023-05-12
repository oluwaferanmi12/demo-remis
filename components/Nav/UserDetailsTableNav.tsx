import React from "react";
import Image from "next/image";
import search_icon from "../../public/ICONS/SVG/search-icon.svg";
import { UserDetailsFilterForm } from "../Forms/UserDetailsFilterForm";

export const UserDetailsTableNav = ({
  headerText = "",
  handleSearchValue,
  currentSearchValue,
  handleDate,
  handleEndDate,
}: {
  headerText?: string;
  handleSearchValue?: (value: string) => void;
  currentSearchValue?: string;
  handleDate: (value: string) => void;
  handleEndDate: (value: string) => void;
}) => {
  const inputStyle =
    "w-[124px] text-[#ffffff80] placeholder:text-sm  focus:outline-none pb-1 pt-1 border border-[#A4AFB7] px-2 rounded-md bg-[#1A2035]";

  const searchStyle = "";
  return (
    <div className="p-6 pr-12 font-Quiet_sans">
      <div className="text-[#9299A8] text-2xl font-semibold ">{headerText}</div>

      <div className="flex justify-between mt-4">
        <UserDetailsFilterForm
          handleDate={handleDate}
          handleEndDate={handleEndDate}
        />

        <form action="">
          <div className="relative flex flex-row">
            <div className="absolute top-3">
              <Image src={search_icon} alt="" />
            </div>
            <div>
              <input
                type="text"
                value={currentSearchValue}
                onChange={(e) => {
                  handleSearchValue && handleSearchValue(e?.target.value);
                }}
                className="text-[#ffffff52] placeholder:text-[#ffffff52] pl-6  placeholder:text-sm  focus:outline-none pb-1 pt-1 border-b border-[#A4AFB7] px-2 w-[200px] bg-transparent "
                placeholder="SEARCH"
              />
            </div>

            <select
              name=""
              id=""
              className="bg-[#1A2035] text-[#ffffff80] rounded-md border border-[#ffffff80] px-2 ml-3"
            >
              <option value="">Transaction type</option>
              <option value="Credit">Credit</option>
              <option value="Credit">Debit</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};
