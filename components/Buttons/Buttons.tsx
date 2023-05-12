import React from "react";
import { useRouter } from "next/router";

export const Button = () => {
  return <div>Button</div>;
};

export const DetailsButton = ({
  text,
  id,
  url,
}: {
  text: string;
  id: string;
  url: string;
}) => {
  const router = useRouter();
  return (
    <span
      onClick={() => {
        router.push(url);
      }}
      className={`bg-[#B0B7CA] text-[#0D0D0D] font-Quiet_sans py-2 px-6 cursor-pointer rounded-sm text-xs `}
    >
      {text}
    </span>
  );
};
export const SuspendButton = ({
  text,
  email,
  handleSuspendEmail,
  url,
  handleSuspend,
}: {
  text: string;
  handleSuspendEmail:(value: string) => void;
  email: string;
  url: string;
  handleSuspend: (value: boolean) => void;
}) => {
  const router = useRouter();
  return (
    <span
      onClick={() => {
        handleSuspend(true);
        handleSuspendEmail(email);
      }}
      className={`bg-[#F3BFBF] ml-4 text-[#D72F2F] font-Quiet_sans py-2 px-6 cursor-pointer rounded-sm text-xs `}
    >
      {text}
    </span>
  );
};

export const UnSuspendButton = ({
  text,
  email,
  handleUnSuspendEmail,
  url,
}: {
  text: string;
  handleUnSuspendEmail: (value: string) => void;
  email: string;
  url: string;
}) => {
  const router = useRouter();
  return (
    <span
      onClick={() => {
        handleUnSuspendEmail(email);
      }}
      className={`bg-[#8DCEA0] ml-4 text-[#089430] font-Quiet_sans py-2 px-6 cursor-pointer rounded-sm text-xs `}
    >
      {text}
    </span>
  );
};

export const DangerButton = ({
  text,
  danger,
}: {
  text: string;
  danger: boolean;
}) => {
  return (
    <div
      className={`${
        danger ? "bg-transparent border border-[#D72F2F]" : "bg-[#F3BFBF]"
      }  text-[#D72F2F] py-3 text-center font-Quiet_sans rounded-[4px] cursor-pointer`}
    >
      {text}
    </div>
  );
};

export const StatusButton = ({ status }: { status: string }) => {
  return (
    <>
      {status == "Credit" && (
        <span className="bg-[#8DCEA0] font-Quiet_sans text-[#089430] px-3 py-1 rounded-full">
          Credit
        </span>
      )}
      {status == "Debit" && (
        <span className="bg-[#ED9F9F] text-[#D72F2F] px-3 py-1 rounded-full font-Quiet_sans">
          Debit
        </span>
      )}
      {status == "pending" && (
        <span className="bg-[#FDE2B1] text-[#FAA004] px-3 py-1 rounded-full font-Quiet_sans">
          Pending
        </span>
      )}
    </>
  );
};
