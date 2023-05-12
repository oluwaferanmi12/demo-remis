import React from "react";
import { FilterForm } from "../Forms/FilterForm";
import search_icon from "../../public/ICONS/SVG/search-icon.svg";
import Image from "next/image";

export const CardReQuestPNav = ({
  headerText = "",
  handleSearchValue,
  currentSearchValue,
}: {
  headerText?: string;
  handleSearchValue?: (value: string) => void;
  currentSearchValue?: string;
}) => {
  return (
    <div className="flex justify-between items-center pr-12 font-Quiet_sans">
      <div className="flex  items-center p-6 pr-12 font-Quiet_sans flex">
        <p className="text-[#9299A8] text-2xl font-semibold tracking-wide">
          Card Requests(10)
        </p>
        <div className="ml-4">
          <select
            name=""
            id=""
            className="bg-transparent text-[#9299A8] border py-2 px-3 rounded-lg focus:outline-none border-[#ACB2BD]"
          >
            <option value="">All cards</option>
          </select>
        </div>
      </div>
      <div className="flex">
        <p className="bg-[#089430] px-4 rounded-lg py-3 text-[#E6F4EA]">
          Print card (10)
        </p>
        <p className="bg-transparent ml-3 px-4 rounded-lg py-3 text-[#089430] border border-[#089430]">
          Accept request (10)
        </p>
        <p className="bg-transparent ml-3 px-4 rounded-lg py-3 border border-[#D72F2F] text-[#D72F2F]">
          Decline request (10)
        </p>
      </div>
    </div>
  );
};
