import React, { useState } from "react";
import { SideNavText } from "../Text/SideNavText";
import { useSelector, useDispatch } from "react-redux";
import { navContent } from "@/data/NavContent";
import card from "../../public/ICONS/SVG/card.svg";
import arrow_down from "../../public/ICONS/SVG/arrow_down.svg";

import logo from "../../public/ICONS/SVG/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { RootState } from "@/store/store";
import { savePage } from "@/store/reducers/currentPage";

export const SideNav = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state: RootState) => state.currentPage);
  const router = useRouter();
  const [activeCardRequest, setActiveCardRequest] = useState(-1);

  return (
    <div className="h-screen bg-[#202940] min-w-[250px] ">
      <div className="px-3 border-b-2 border-[#1F2228]">
        <div className="px-3 mt-4">
          <Image src={logo} alt="" />
        </div>

        <div className="py-10">
          {navContent.map((item, index, root) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setActiveCardRequest(-1);
                  if (item.alias == "card") {
                    // dispatch(savePage(item.alias));
                    return;
                  }
                  dispatch(savePage(item.alias));
                  router.push(item.url);
                }}
              >
                <SideNavText
                  alias={item.alias}
                  allItem={item}
                  icon={item.icon}
                  text={item.name}
                  active={currentPage === item.alias}
                />
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};
