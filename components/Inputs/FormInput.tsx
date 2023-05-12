import React from "react";

interface FormInputProps {
  placeholder?: string;
  handleInputData: (value: React.SetStateAction<string>) => void;
  passwordType?: boolean;
  name: string;
  label:string;
}

export const FormInput = ({
  placeholder,
  handleInputData,
  passwordType = false,
  name,
  label,
}: FormInputProps) => {
  return (
    <div>
      <p className="font-Quiet_sans mb-3 text-[#2A2A2A] text-xl font-semibold">
        {label}
      </p>
      <div>
        <input
          name={name}
          className="border border-[#D6D6D6] w-full bg-[#F7F9FC] focus:outline-none p-4 rounded-[4px]"
          type={passwordType ? "password" : "text"}
          placeholder={placeholder}
          onChange={(e) => handleInputData(e.target.value)}
        />
      </div>
    </div>
  );
};
