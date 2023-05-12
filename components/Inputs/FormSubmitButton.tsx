import React from "react";

interface FormSubmitButtonProps {
  label: string;
  buttonDisabled: boolean;
}

export const FormSubmitButton = ({
  label,
  buttonDisabled,
}: FormSubmitButtonProps) => {
  return (
    <div>
      <input
        className={`w-full ${
          buttonDisabled ? "bg-[#D2D2D2]" : "bg-[#001755]"
        } py-4 mt-2 rounded-md  text-white font-Quiet_sans`}
        type="submit"
        value={label}
        disabled={buttonDisabled}
      />
    </div>
  );
};
