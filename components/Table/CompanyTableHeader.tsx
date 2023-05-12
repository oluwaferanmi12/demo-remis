import React from 'react'
import {Row, Col} from "antd"

export const CompanyTableHeader = () => {
  return (
    <div className="bg-[#1A2035]  px-6 py-3 text-[#D8DFEE]">
      <Row>
        <Col xs={23}>
          <Row className="w-full ">
            <Col lg={6}>
              <p className="font-Quiet_sans">Name</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans">Email</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center">Number of staffs</p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-center ">Active</p>
            </Col>
            <Col lg={5}>
              <p className="pl-4 font-Quiet_sans text-center mr-6">Action</p>
            </Col>
            <Col lg={2}>{/* <p>Other</p> */}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
