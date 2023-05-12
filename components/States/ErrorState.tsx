import React from "react";
import Image from "next/image";
import errorImage from "../../public/ICONS/SVG/error_icon.svg";
import { useRouter } from "next/router";

export const ErrorState = ({
  text = "Server error occured",
}: {
  text: string;
}) => {
  const router = useRouter();
  return (
    <div className="bg-[#202940] h-[500px] mt-8 flex justify-center items-center flex-col">
      <div>
        <Image src={errorImage} alt="" />
      </div>
      <div className="font-Quiet_sans font-bold text-2xl text-[#B0B7CA]">
        {text}
      </div>
      <div className="mt-6">
        <span
          onClick={() => {
            router.reload();
          }}
          className="bg-[#B0B7CA] p-2  cursor-pointer px-6 rounded-sm font-Quiet_sans"
        >
          Try again
        </span>
      </div>
    </div>
  );
};
