import React from "react";
import { Row, Col } from "antd";
import { DetailsButton } from "../Buttons/Buttons";

interface CardTableDataProp{
  address: string;
  quantity: string;
  email: string;
  companyId: string;
  requestBy: string
}


export const CardTableData = ({address , requestBy, quantity, email, companyId}:CardTableDataProp) => {
  return (
    <div className="bg-[#202940] px-6 py-6 text-[#D8DFEE] border-b border-[#ffffff52]">
      <Row>
        <Col xs={23}>
          <Row className="w-full">
            <Col lg={5}>
              <p className="font-Quiet_sans">
                {requestBy}
              </p>
            </Col>
            <Col lg={6}>
              <p className="font-Quiet_sans">{address ? address : "-"}</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">{quantity}</p>
            </Col>
            <Col lg={6}>
              <p className="pl-4 font-Quiet_sans text-center mr-6">
                <DetailsButton
                  text="Details"
                  id=""
                  url={`/cards/card-request-details?q=${companyId}`}
                />
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
