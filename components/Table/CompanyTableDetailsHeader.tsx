import React from 'react'
import {Row , Col} from "antd"

export const CompanyTableDetailsHeader = () => {
  return (
    <div className="bg-[#1A2035] px-6 py-3 text-[#B0B7CA]">
      <Row>
        <Col xs={23}>
          <Row className="w-full">
            <Col lg={2}>
              <p className="font-Quiet_sans text-center">#</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">Transaction Details</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans text-center">Amount</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans text-center">Transaction ID</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center pr-3">Date</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center pr-2">Status</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
