import React from "react";
import { FilterForm } from "../Forms/FilterForm";
import search_icon from "../../public/ICONS/SVG/search-icon.svg";
import Image from "next/image";
import { useDispatch , useSelector } from "react-redux";
import { handleCardRequestQuery } from "@/store/reducers/handleCardRequestFilter";
import { RootState } from "@/store/store";
import moment from "moment";
import { CardRequestFilterForm } from "../Forms/CardRequestFilterForm";

export const CardRequestNav = ({
  headerText = "",
  handleSearchValue,
  currentSearchValue,
}: {
  headerText?: string;
  handleSearchValue?: (value: string) => void;
  currentSearchValue?: string;
}) => {
  const dispatch = useDispatch();
  const {query , date , endDate} = useSelector((state:RootState) => state.cardRequestReducer )
  
  return (
    <div className="flex justify-between p-6 pr-12 font-Quiet_sans">
      <CardRequestFilterForm />

      <form action="">
        <div className="relative">
          <div className="absolute top-3">
            <Image src={search_icon} alt="" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              // dispatch(setQuery(e.target.value));
              dispatch(handleCardRequestQuery(e.target.value))
            }}
          

            className="text-[#ffffff52] placeholder:text-[#ffffff52] pl-6  placeholder:text-sm  focus:outline-none pb-1 pt-1 border-b border-[#A4AFB7] px-2 w-[200px] bg-transparent "
            placeholder="SEARCH"
          />
        </div>
      </form>
    </div>
  );
};
