import React from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import unchecked from "@/public/ICONS/SVG/unChecked.svg";
import checked from "@/public/ICONS/SVG/checkBoxClicked.svg";
import marked from "@/public/ICONS/SVG/card-request-mark.svg";
import decline_image from "@/public/ICONS/SVG/card-request-x.svg";

export const CardRequestPData = () => {
  return (
    <div className="bg-[#202940]  px-6 py-3 text-[#D8DFEE] border-b border-[#ffffff52]">
      <Row>
        <Col xs={23}>
          <Row className="w-full flex items-center ">
            <Col lg={1}>
              <div className="items-center flex cursor-pointer">
                <Image src={unchecked} alt="" />
              </div>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans">Abdullahi Abeeb Olanrewaju</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">
                Abdullahihabeeb@gmail.com
              </p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">Lagos, Nigeria</p>
            </Col>

            <Col lg={4}>
              <p className="font-Quiet_sans text-center">Physical Debit card</p>
            </Col>
            <Col lg={4}>
              <div className="flex justify-center">
                <input
                  className="bg-[#111827] px-3 p-2 rounded-lg"
                  placeholder="Enter card number"
                />
              </div>
            </Col>
            <Col lg={3}>
              <div className="flex items-center justify-center">
                <div className="mr-4 cursor-pointer">
                  <Image src={marked} alt="" />
                </div>
                <div className="cursor-pointer">
                  <Image src={decline_image} alt="" />
                </div>
              </div>
            </Col>

            {/* <Col lg={3}></Col> */}
            {/* <Col lg={1}>
              <div className="flex justify-center font-Quiet_sans">
                <p className="bg-[#8DCEA0] text-[#089430] py-2 px-4 rounded-lg cursor-pointer">
                  Accept request
                </p>
                <p className="py-2 ml-4 text-[#D72F2F] cursor-pointer">
                  Decline
                </p>
              </div>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
