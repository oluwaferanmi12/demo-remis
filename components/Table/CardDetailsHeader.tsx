import React from 'react';
import {Row , Col} from "antd";


export const CardDetailsHeader = () => {
  return (
    <div className="bg-[#1A2035]  px-6 py-3 text-[#D8DFEE]">
      <Row>
        <Col xs={23}>
          <Row className="w-full ">
            {/* <Col lg={1}>#</Col> */}
            <Col lg={3}>
              <p className="font-Quiet_sans text-center">Transaction type</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">Amount</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center mr-1">New balance</p>
            </Col>

            <Col lg={4}>
              <p className="font-Quiet_sans text-center ">TransactionID</p>
            </Col>
            <Col lg={4}>
              <p className="pl-4 font-Quiet_sans text-center mr-6">Date</p>
            </Col>
            <Col lg={4}>
              <p className="pl-4 font-Quiet_sans text-center mr-6">Description</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
