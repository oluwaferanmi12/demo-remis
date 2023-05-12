import React, { useEffect, useState } from "react";
import Image from "next/image";
import bell from "../../public/ICONS/SVG/bell-notification.svg";
import line_1 from "../../public/ICONS/SVG/line_1.svg";
import line_2 from "../../public/ICONS/SVG/line_2.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { GetUserDetails } from "@/utils/GetUserDetails";

export const Navbar = () => {
  interface UserPayload {
    fullName: string;
  }
  const [userPayload, setUserPayload] = useState<UserPayload>();
  useEffect(() => {
    if (GetUserDetails) {
      setUserPayload(GetUserDetails);
    }

  }, []);

  return (
    <div className="bg-[#202940] items-center flex justify-end py-3 px-8 text-white font-Quiet_sans">
      <p className="text-[#626262] mr-6">|</p>

      {/* <div className="mr-4">
        <Image src={bell} alt="" />
      </div> */}
      <div className="mr-3">
        <Image src={bell} alt="" />
      </div>
      <div className="flex items-center">
        <p>{userPayload?.fullName}</p>
        <p className="mr-3">
          <Image src={line_1} alt="" />
        </p>
        <p>Admin</p>
      </div>
    </div>
  );
};
