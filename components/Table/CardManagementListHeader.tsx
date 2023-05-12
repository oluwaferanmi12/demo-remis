import React from "react";
import { Row, Col } from "antd";
import checked from "@/public/ICONS/SVG/checkBoxClicked.svg";
import unChecked from "@/public/ICONS/SVG/unChecked.svg";
import Image from "next/image";

export const CardManagementListHeader = () => {
  return (
    <div className="bg-[#1A2035]  px-6 py-3 text-[#D8DFEE]">
      <Row>
        <Col xs={23}>
          <Row className="w-full ">
            
            <Col lg={5}>
              <p className="font-Quiet_sans">Name</p>
            </Col>
            <Col lg={4} className="text-center">
              <p className="font-Quiet_sans">Card number</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">Card type</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans text-center">Status</p>
            </Col>
            <Col lg={6}></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
