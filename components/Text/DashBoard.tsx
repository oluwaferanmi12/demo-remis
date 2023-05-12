import React from "react";

interface DashBoardHeaderProps {
  header: string;
  subText: string;
}

export const DashBoardHeader = ({ header, subText }: DashBoardHeaderProps) => {
  return (
    <div className="my-6">
      <p className="text-[#B0B7CA] text-2xl font-bold font-Quiet_sans tracking-wide">{header}</p>
      <p className="text-[#D8DFEE] text-xs my-2 font-Quiet_sans tracking-wide">{subText}</p>
    </div>
  );
};
