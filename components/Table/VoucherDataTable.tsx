import React from "react";
import Image from "next/image";
import { Row, Col } from "antd";
import { DetailsButton, SuspendButton } from "../Buttons/Buttons";
import three_dots from "../../public/ICONS/SVG/three_dots.svg";

interface VoucherActiveProps {
  currentIndex: number;
  activeIndex: number;
  handleActive: (value: number) => void;
  active: boolean;
  id: string;
  voucherPin: string;
  dateGenerated: string;
  user: string;
  voucherStatus: boolean;
  amount: string;
  handleCurrentPin: (value: string) => void;
}

export const VoucherDataTable = ({
  active,
  voucherPin,
  dateGenerated,
  user,
  voucherStatus,
  amount,
  handleCurrentPin,
}: VoucherActiveProps) => {
  interface VoucherDataTableProps {
    voucherPin: string;
    dateGenerated: string;
    user: string;
    voucherStatus: string;
    amount: string;
  }

  return (
    <div className="bg-[#202940] ">
      <Row className="">
        <Col xs={23}>
          <Row className="w-full  py-6 text-[#D8DFEE] px-6 border-b border-[#ffffff52] ">
            <Col lg={6}>
              <p className="font-Quiet_sans">{voucherPin}</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans">{dateGenerated}</p>
            </Col>

            <Col lg={3}>
              <p className="font-Quiet_sans text-center">{amount}</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans text-center">{user}</p>
            </Col>

            <Col lg={3} className="text-center">
              <p
                className={`font-Quiet_sans ${
                  voucherStatus ? " text-[#C42B2B] " : "text-[#089430]"
                }`}
              >
                {voucherStatus ? "Used" : "Unused"}
              </p>
            </Col>
            <Col lg={2} className="text-center">
              <span
                onClick={() => {
                  handleCurrentPin(voucherPin);
                }}
                className={`bg-[#B0B7CA] text-[#0D0D0D] font-Quiet_sans py-2 px-6 cursor-pointer rounded-sm text-xs `}
              >
                Details
              </span>
            </Col>

            {/* <Col lg={2}>
              <div className="cursor-pointer flex justify-center relative">
                <Image
                  src={three_dots}
                  alt=""
                  onClick={() => {
                    currentIndex === activeIndex
                      ? handleActive(-1)
                      : handleActive(currentIndex);
                  }}
                />
                {currentIndex === activeIndex && (
                  <div className="absolute bg-[#1A2035] top-6 text-xl w-[140px] left-5 rounded-2xl p-4 z-10 ">
                    <p className="py-2 font-Quiet_sans">Suspend</p>
                    <p className="mb-5 font-Quiet_sans">Delete</p>
                  </div>
                )}
              </div>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default VoucherDataTable;
