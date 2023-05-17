import React from "react";
import Image from "next/image";
import input_select from "../../public/ICONS/SVG/input-select.svg";
import search_icon from "../../public/ICONS/SVG/search-icon.svg";
import { FilterForm } from "../Forms/FilterForm";
import { useDispatch } from "react-redux";
import { setQuery } from "@/store/reducers/handleDateFilter";
import { MerchantDetailsFilterForm } from "../Forms/MerchantDetailsFilterForm";

export const LogsTxnTableNav = ({
  headerText = "",
  handleSearchValue,
  currentSearchValue,
}: {
  headerText?: string;
  handleSearchValue?: (value: string) => void;
  currentSearchValue?: string;
}) => {
  const dispatch = useDispatch();
  const inputStyle =
    "w-[124px] text-[#ffffff80] placeholder:text-sm  focus:outline-none pb-1 pt-1 border border-[#A4AFB7] px-2 rounded-md bg-[#1A2035]";

  const searchStyle = "";
  return (
    <div className="flex justify-between p-6 pr-12 font-Quiet_sans">
      {headerText ? (
        <div className="text-[#9299A8] text-2xl font-semibold ">
          {headerText}
        </div>
      ) : (
        <MerchantDetailsFilterForm />
      )}

      <form action="">
        <div className="relative">
          <div className="absolute top-3">
            <Image src={search_icon} alt="" />
          </div>
          <input
            type="text"
            value={currentSearchValue}
            onChange={(e) => {
              //   dispatch(setQuery(e.target.value));
            }}
            className="text-[#ffffff52] placeholder:text-[#ffffff52] pl-6  placeholder:text-sm  focus:outline-none pb-1 pt-1 border-b border-[#A4AFB7] px-2 w-[200px] bg-transparent "
            placeholder="SEARCH"
          />
        </div>
      </form>
    </div>
  );
};
