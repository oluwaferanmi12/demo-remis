import React from "react";
import Image from "next/image";

export const MoneyFlow = ({
  title,
  amount,
  imgUrl,
  textSmall = false,
  removeLeftMargin = false,
}: {
  title: string;
  textSmall?: boolean;
  amount: string;
  imgUrl: string;
  removeLeftMargin?: boolean;
}) => {
  return (
    <div className="flex items-center ">
      <div>
        <Image src={imgUrl} alt="" />
      </div>
      <div className={`text-[#9AA1AE] font-Quiet_sans ${!removeLeftMargin && "ml-5"}`}>
        <p className="mb-1">{title}</p>
        <p className={textSmall ? "text-base" : "text-2xl"}> {amount}</p>
      </div>
    </div>
  );
};
