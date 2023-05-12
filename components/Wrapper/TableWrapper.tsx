import React from 'react'


interface TableWrapperProps{
    children: React.ReactNode
}

export const TableWrapper = ({children}:TableWrapperProps) => {
  return <div className="rounded-2xl mb-10  bg-[#202940] mt-4">{children}</div>;
}
