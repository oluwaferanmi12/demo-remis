import React from "react";
import { Row, Col } from "antd";
import { DetailsButton } from "../Buttons/Buttons";

export const CardManagementTableData = () => {
  return (
    <div className="bg-[#202940] px-6 py-6 text-[#D8DFEE] border-b border-[#ffffff52]">
      <Row>
        <Col xs={23}>
          <Row className="w-full">
            <Col lg={5}>
              <p className="font-Quiet_sans">Epump</p>
            </Col>
            <Col lg={6}>
              <p className="font-Quiet_sans">Epump@fuelmetrics.com</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">50</p>
            </Col>
            <Col lg={6}>
              <p className="pl-4 font-Quiet_sans text-center mr-6">
                <DetailsButton
                  text="View cards"
                  id=""
                  url={"/card-management/company_card_management_list"}
                />
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
