import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import {
  DetailsButton,
  SuspendButton,
  UnSuspendButton,
} from "../Buttons/Buttons";
import three_dots from "../../public/ICONS/SVG/three_dots.svg";
import Image from "next/image";
import moment from "moment";

interface TableDataProps {
  email: string;
  name: string;
  currentIndex: number;
  activeIndex: number;
  handleActive: (value: number) => void;
  id: string;
  balance: string;
  handleSuspendEmail: (value: string) => void;
  isActive: boolean;
  handleSuspend: (value: boolean) => void;
  date: string;
  handleUnSuspendEmail : (value: string) => void
}

export const TableData = ({
  email,
  name,
  currentIndex,
  activeIndex,
  handleActive,
  handleUnSuspendEmail,
  date,
  id,
  balance,
  handleSuspend,
  handleSuspendEmail,
  isActive,
}: TableDataProps) => {
  const [showDetails, setShowDetails] = useState();
  return (
    <div className="bg-[#202940] ">
      <Row>
        <Col xs={23}>
          <Row className="w-full  py-6 text-[#D8DFEE] px-6 border-b border-[#ffffff52] ">
            <Col lg={5}>
              <p className="font-Quiet_sans">{name}</p>
            </Col>
            <Col lg={6}>
              <p className="font-Quiet_sans">{email}</p>
            </Col>
            <Col lg={3}>
              <div className="text-[#D72F2F] font-Quiet_sans">
                {!isActive ? (
                  <p className="text-[#089430]">Active</p>
                ) : (
                  <p className="text-[#D72F2F]">Deactivated</p>
                )}
              </div>
            </Col>
            <Col lg={3} className="text-center">
              <p className="font-Quiet_sans">
                {moment(date).format("YY-MM-DD, HH:mm")}
              </p>
            </Col>
            <Col lg={6} className="text-center flex justify-center">
              <DetailsButton
                text="Details"
                id={id}
                url={`/user/details?q=${id}`}
              />
              {!isActive ? (
                <SuspendButton
                  handleSuspend={handleSuspend}
                  handleSuspendEmail={handleSuspendEmail}
                  text="Suspend"
                  email={email}
                  url=""
                />
              ) : (
                <UnSuspendButton
                  handleUnSuspendEmail={handleUnSuspendEmail}
                  text="Unblock"
                  email={email}
                  url=""
                />
              )}
            </Col>
            {/* <Col lg={3}>
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
