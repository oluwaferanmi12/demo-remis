import React from "react";
import Image from "next/image";
import paginateFirst from "../../public/ICONS/SVG/paginateFirst.svg";
import paginateLast from "../../public/ICONS/SVG/paginateLast.svg";
import paginatePrevious from "../../public/ICONS/SVG/paginatePrevious.svg";
import paginateNext from "../../public/ICONS/SVG/paginateNext.svg";

interface PaginationProps {
  paginationValues: number[];
  handlePaginationShow: (value: []) => void;
  currentPagination: number;
  paginationsShown: (number | string)[];
  handleCurrentPagination: (value: number) => void;
}

export const Pagination = ({
  paginationValues,
  handlePaginationShow,
  currentPagination,
  handleCurrentPagination,
  paginationsShown = [],
}: PaginationProps) => {
  const checkForSlice = (): boolean => {
    const rArray = paginationValues.slice(
      paginationValues.indexOf(currentPagination)
    );

    return rArray.length >= 3 ? true : false;
  };

  //   const sortCurrentPagination = (
  //     totalArray: (number | string)[],
  //     currentPagination: number,
  //     totalPaginations: number
  //   ) => {
  //     // Try to slice from the current to the last and see if the remaining value is less greater than 3
  //     const tArray = totalArray;
  //     // get the current index of the currentPage
  //     const currentIndex = tArray.indexOf(currentPagination);
  //     const mArray = tArray.slice(currentIndex);

  //     if (mArray.length > 3) {
  //       const arrayToShow = mArray.splice(0, 3);
  //       arrayToShow.push("...");
  //       arrayToShow.push(totalPaginations);
  //       setPaginationsShown(arrayToShow);
  //     } else {
  //       setPaginationsShown(mArray);
  //     }
  //   };
  return (
    <div>
      {paginationsShown.length && (
        <div className="flex justify-center py-8">
          {paginationValues[0] !== currentPagination &&
            paginationValues.indexOf(currentPagination) > 1 && (
              <div
                className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
                onClick={() => {
                  handleCurrentPagination(1);
                }}
              >
                <Image src={paginateFirst} alt="" width={24} height={24} />
              </div>
            )}

          {paginationValues[0] !== currentPagination && (
            <div
              className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
              onClick={() => {
                handleCurrentPagination(currentPagination - 1);
              }}
            >
              <Image src={paginatePrevious} alt="" width={24} height={24} />
            </div>
          )}

          {/* The remain with words */}
          {paginationsShown.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  if (item === "...") {
                    return;
                  }
                  handleCurrentPagination(+item);
                }}
                className={`p-4 ${
                  currentPagination == item
                    ? "bg-[#B0B7CA] text-[#111827]"
                    : "bg-[#111827] text-[#B0B7CA] "
                } px-6 cursor-pointer rounded-xl mr-2 font-Quiet_sans  font-xl `}
              >
                {item}
              </div>
            );
          })}

          {paginationValues[paginationValues.length - 1] !==
            currentPagination && (
            <div
              onClick={() => {
                handleCurrentPagination(currentPagination + 1);
              }}
              className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
            >
              <Image src={paginateNext} alt="" width={24} height={24} />
            </div>
          )}

          {paginationValues[paginationValues.length - 1] !==
            currentPagination &&
            checkForSlice() && (
              <div
                className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
                onClick={() => {
                  handleCurrentPagination(
                    paginationValues[paginationValues.length - 1]
                  );
                }}
              >
                <Image src={paginateLast} alt="" width={24} height={24} />
              </div>
            )}
        </div>
      )}
    </div>
  );
};
