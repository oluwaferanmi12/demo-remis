import React from 'react'
import {Row , Col} from "antd"

export const CardsTableHeader = () => {
  return (
    <div className="bg-[#1A2035]  px-6 py-3 text-[#D8DFEE]">
      <Row>
        <Col xs={23}>
          <Row className="w-full ">
            <Col lg={5}>
              <p className="font-Quiet_sans">Request by</p>
            </Col>
            <Col lg={6}>
              <p className="font-Quiet_sans">Address</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">Number of cards requests</p>
            </Col>
            <Col lg={6}>
              {/* <p className="pl-4 font-Quiet_sans text-center mr-6">Action</p> */}
            </Col>
            {/* <Col lg={3}></Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
