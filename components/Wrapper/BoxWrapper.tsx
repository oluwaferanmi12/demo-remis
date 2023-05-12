import React from 'react'

interface BoxWrapperProps{
    children:React.ReactNode;
}

export function BoxWrapper({children}:BoxWrapperProps) {
  return <div className="border border-[#ffffff33] rounded-2xl overflow-hidden">{children}</div>;
}

