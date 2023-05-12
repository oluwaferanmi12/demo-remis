import React from "react";
import { Row, Col } from "antd";

export const DetailsTableHeader = () => {
  return (
    <div className="bg-[#1A2035] px-6 py-3 text-[#B0B7CA]">
      <Row>
        <Col xs={23}>
          <Row className="w-full">
            <Col lg={3}>
              <p className="font-Quiet_sans text-center">Date</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center">ref</p>
            </Col>

            <Col lg={3}>
              <p className="font-Quiet_sans text-center pr-2">
                Transaction type
              </p>
            </Col>

            <Col lg={3}>
              <p className="font-Quiet_sans text-center">Credit</p>
            </Col>

            <Col lg={3}>
              <p className="font-Quiet_sans text-center">Debit</p>
            </Col>

            <Col lg={3}>
              <p className="font-Quiet_sans text-center">New Balance</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center pr-3">Description</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center pr-2">status</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
