import React from 'react'
import no_user from "../../public/ICONS/SVG/no_user.svg"
import Image from "next/image"

export const TableEmptyState = ({text , icon=no_user} : {text:string , icon?: string}) => {
  return (
    <div className="bg-[#202940] h-[500px] flex items-center justify-center flex-col">
      <div>
        <Image src={icon} alt="" />
      </div>
      <p className="font-Quiet_sans text-2xl text-[#B0B7CA] mt-4">
        {text}
      </p>
    </div>
  );
}
