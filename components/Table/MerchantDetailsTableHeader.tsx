import React from "react";
import { Row, Col } from "antd";

export const MerchantDetailsTableHeader = () => {
  return (
    <div className="bg-[#1A2035]  px-6 py-3 text-[#D8DFEE]">
      <Row>
        <Col xs={23}>
          <Row className="w-full ">
            <Col lg={3}>
              <p className="font-Quiet_sans text-[#B0B7CA]">Date</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-[#B0B7CA]">Ref number</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center text-[#B0B7CA]">
                Transaction type
              </p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center text-[#B0B7CA]">
                Credit
              </p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center text-[#B0B7CA]">
                Debit
              </p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center text-[#B0B7CA]">
                Customer ID
              </p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-[#B0B7CA] text-center">
                Transaction request
              </p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center pr-2 text-[#B0B7CA]">
                Status
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
