import React from "react";
import { Row, Col } from "antd";

export const LogsTxnDetailsHeader = () => {
  return (
    <div className="bg-[#1A2035]  px-6 py-3 text-[#D8DFEE]">
      <Row>
        <Col xs={23}>
          <Row className="w-full ">
            <Col lg={4}>
              <p className="font-Quiet_sans text-[#B0B7CA]">Date received</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-[#B0B7CA]">Request type</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center text-[#B0B7CA]">
                Status
              </p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center text-[#B0B7CA]">
                Date processed
              </p>
            </Col>
            
            <Col lg={4}>
              <p className="font-Quiet_sans text-center text-[#B0B7CA]">
                Provider
              </p>
            </Col>
            
          </Row>
        </Col>
      </Row>
    </div>
  );
};
