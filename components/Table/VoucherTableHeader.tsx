import React from "react";
import { Row, Col } from "antd";

const VoucherTableHeader = () => {
  return (
    <div className="bg-[#1A2035]  px-6  pb-3 text-[#D8DFEE]">
      <Row>
        <Col xs={23}>
          <Row className="w-full ">
            <Col lg={6}>
              <p className="font-Quiet_sans">Voucher pin</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans">Date Generated</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center">Amount</p>
            </Col>
            <Col lg={5}>
              <p className="pl-4 font-Quiet_sans text-center mr-6">User </p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center ">Voucher status</p>
            </Col>
            <Col lg={2}>{/* <p>Other</p> */}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default VoucherTableHeader;
