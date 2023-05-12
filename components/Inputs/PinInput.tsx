import React from "react";

interface PinProps {
  label: string;
  otpArray: string[];
  handleOtpArray: (value: string[]) => void;
  currentIndex: number;
  inputValue: string;
  handleActiveIndex: (value: number) => void;
}
export const PinInput = React.forwardRef<HTMLInputElement, PinProps>(
  (
    {
      label,
      otpArray,
      handleOtpArray,
      currentIndex,
      inputValue,
      handleActiveIndex,
    
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type="text"
        className="w-[48px] bg-[#667084] border mr-3 border-[#D0D5DD] py-3 text-center focus:outline-none rounded-lg"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newArray = [...otpArray];
          newArray[currentIndex] = e.target.value.slice(
            e.target.value.length - 1
          );

          handleOtpArray(newArray);
          if (e.target.value == "") {
            handleActiveIndex(currentIndex - 1);
          } else {
            handleActiveIndex(currentIndex + 1);
          }
        }}

        onKeyDown={(e) => {
          if (e.key == "Backspace" && otpArray[currentIndex] == "") {
            handleActiveIndex(currentIndex);
          }
        }}
        value={inputValue}
      />
    );
  }
);

PinInput.displayName = "PinInput";
