import Image from "next/image";

interface VoucherContainerProps {
  imgUrl: string;
  mainText: string;
  subText: string;
  borderBottom: boolean;
}

export const VoucherContainer = ({
  imgUrl,
  mainText,
  subText,
  borderBottom,
}: VoucherContainerProps) => {
  return (
    <>
      <div
        className={`p-3 ${
          borderBottom && "border-b border-[#ffffff1a] "
        } flex items-center`}
      >
        <div>
          <Image src={imgUrl} alt="" />
        </div>
        <div className="font-Quiet_sans ml-4">
          <p className="text-[#ACB2BD]">{mainText}</p>
          <p className="text-xl text-[#ACB2BD]">{subText}</p>
        </div>
      </div>
    </>
  );
};
