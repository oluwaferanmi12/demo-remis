import React from 'react'

interface ModalHeaderProps {
    mainText: string, 
    subText:string
}
export const ModalHeader = ({mainText , subText}: ModalHeaderProps) => {
  return (
    <div className="font-Quiet_sans text-center">
      <p className="text-[#9299A8] text-2xl font-bold">{mainText}</p>
      <p className="text-[#D8DFEE] mt-2">
        {subText}
      </p>
    </div>
  );
}
