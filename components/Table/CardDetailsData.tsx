import React from "react";
import { Row, Col } from "antd";
import moment from "moment";

interface CardDetailsProps {
  amount: string;
  description: string;
  date: string;
  transactionReference: string;
  newBalance: string;
  category: string;
  currency?: string;
  type: string;
}
export const CardDetailsData = ({
  amount = "",
  description = "",
  date = "",
  transactionReference = "",
  newBalance = "",
  category = "",
  currency = "NGN",
  type = "",
}: CardDetailsProps) => {
  return (
    <div className="bg-[#202940] px-6 py-6 text-[#D8DFEE] border-b border-[#ffffff52]">
      <Row>
        <Col xs={23}>
          <Row className="w-full ">
            {/* <Col lg={1}>1</Col> */}
            <Col lg={3}>
              <p
                className={`font-Quiet_sans text-center ${
                  type == "Debit" ? "text-[#D72F2F]" : "text-[#089430]"
                }`}
              >
                {type}
              </p>
            </Col>

            <Col lg={4}>
              <p className="font-Quiet_sans text-center">
                {" "}
                {currency + " " + amount}
              </p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">
                {currency + " " + newBalance}
              </p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center ">
                {transactionReference}
              </p>
            </Col>
            <Col lg={4}>
              <p className="pl-4 font-Quiet_sans text-center mr-6">
                {moment(date).format("YY-MM-DD, HH:mm")}
              </p>
            </Col>
            <Col lg={4}>
              <div className="text-center">
                <p className="ml-4 text-center  font-Quiet_sans text-center">
                  {description}
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
