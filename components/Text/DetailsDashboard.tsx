import React from "react";
import Image from "next/image";
import arrow_left from "../../public/ICONS/SVG/arrow-left.svg";
import { FilterForm } from "../Forms/FilterForm";
import {useRouter} from "next/router"

export const DetailsDashboard = ({
  name,
  subText = "You can drill down to user to manage any user account here",
}: {
  name: string;
  subText?: string;
}) => {
  const router = useRouter();
  return (
    <div className={`flex justify-between font-Quiet_sans `}>
      <div className="flex">
        <div className="mr-4 mt-1 cursor-pointer" onClick={() => router.back()}>
          <Image src={arrow_left} alt="" />
        </div>
        <div>
          <p className="text-[#9299A8] text-2xl font-bold tracking-wide">
            {name}
          </p>
          <p className="text-[#D8DFEE] text-xs my-2 font-Quiet_sans tracking-wide">
            {subText}
          </p>
        </div>
      </div>

      
    </div>
  );
};
