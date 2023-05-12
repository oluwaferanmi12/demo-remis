import React from "react";
import Image from "next/image";
import { Row, Col } from "antd";
import { DetailsButton, SuspendButton } from "../Buttons/Buttons";
import three_dots from "../../public/ICONS/SVG/three_dots.svg";

interface CompanyDataTableProps {
  currentIndex: number;
  activeIndex: number;
  handleActive: (value: number) => void;
  name: string;
  email: string;
  balance: string;
  noOfStaffs: string;
  active: boolean;
  id: string;
  kycVerified: boolean;
}

function CompanyDataTable({
  currentIndex,
  activeIndex,
  handleActive,
  name,
  email,
  balance,
  noOfStaffs,
  id,
  active,
  kycVerified,
}: CompanyDataTableProps) {
  const isActive = true;
  return (
    <div className="bg-[#202940] ">
      <Row>
        <Col xs={23}>
          <Row className="w-full  py-6 text-[#D8DFEE] px-6 border-b border-[#ffffff52] ">
            <Col lg={6}>
              <p className="font-Quiet_sans">{name}</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans">{email}</p>
            </Col>

            <Col lg={3}>
              <p className="font-Quiet_sans text-center">{noOfStaffs}</p>
            </Col>

            <Col lg={3} className="text-center">
              <p
                className={`font-Quiet_sans ${
                  active ? "text-[#089430]" : "text-[#C42B2B]"
                }`}
              >
                {active ? "Verified" : "UnVerified"}
              </p>
            </Col>
            <Col lg={5} className="text-center">
              <DetailsButton
                text="Details"
                id={id}
                url={`/company/details?q=${id}`}
              />

              <SuspendButton
                text="Suspend"
                url=""
                handleSuspend={()=>{}}
                handleSuspendEmail={() =>{}}
                email=""
              />
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
}

export default CompanyDataTable;
