import React from "react";
import Image from "next/image";
import arrow_down from "../../public/ICONS/SVG/arrow_down.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { savePage } from "@/store/reducers/currentPage";
interface SideNavTextProps {
  text: string;
  icon: string;
  active?: boolean;
  allItem?: allItem;
  alias: string;
}

interface allItem {
  name: string;
  icon: string;
  url: string;
  alias: string;
  subContent?: SubContentProps[];
}

interface SubContentProps {
  name: string;
  icon: string;
  url: string;
  alias: string;
}

export const SideNavText = ({
  text,
  icon,
  active,
  allItem,
  alias,
}: SideNavTextProps) => {
  const { cardSubPage, currentPage } = useSelector(
    (state: RootState) => state.currentPage
  );
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`text-white px-3 justify-between py-2 my-4 rounded-full cursor-pointer flex items-center ${
          active && "bg-[#1a2035]"
        }`}
        onClick={() => {
          if (alias === "card") {
            dispatch(savePage(alias));
          }
        }}
      >
        <div className="flex">
          <div>
            <Image src={icon} alt="" />
          </div>
          <div className="ml-4 font-Quiet_sans">{text}</div>
        </div>
        {text == "Card" && (
          <div>
            <Image src={arrow_down} alt="" />
          </div>
        )}
      </div>
      {text == "Card" &&
        cardSubPage &&
        allItem?.subContent?.map((item, index) => {
          return (
            <div
              key={index}
              className={`text-white px-3 justify-between py-2  rounded-full cursor-pointer flex items-center  ${
                currentPage == item.alias && "bg-[#1a2035]"
              }`}
              onClick={() => {
                dispatch(savePage(item.alias));
                router.push(item.url)
              }}
            >
              <p className="ml-10 font-Quiet_sans">{item.name}</p>
            </div>
          );
        })}
    </>
  );
};
