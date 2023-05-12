import React from "react";
import { Row, Col } from "antd";
import { StatusButton } from "../Buttons/Buttons";
import moment from "moment";

interface DetailsTableDataProps {
  channel: string;
  category: string;
  amount: string;
  status: string;
  count: number;
  transactionReference: string;
  date: string;
  currency: string;
  newBalance: string;
  description: string;
}

export const DetailsTableData = ({
  channel,
  amount,
  status,
  count,
  date,
  currency,
  transactionReference,
  newBalance,
  description,
  category,
}: DetailsTableDataProps) => {
  return (
    <div className="bg-[#202940] ">
      <Row>
        <Col xs={23}>
          <Row className="w-full  py-6 text-[#D8DFEE] px-6 border-b border-[#ffffff52] ">
            <Col lg={3}>
              <p className="text-[#B0B7CA] text-center font-Quiet_sans">
                {moment(date).format("YY-MM-DD, HH:mm")}
              </p>
            </Col>
            <Col lg={3}>
              <p className="text-[#B0B7CA] text-center font-Quiet_sans ">
                {transactionReference}
              </p>
            </Col>

            <Col lg={3} className="text-center">
              {/* <StatusButton status={status} /> */}
              <p className="text-[#B0B7CA] text-center font-Quiet_sans">
                {category}
              </p>
            </Col>

            <Col lg={3} className="text-center">
              <span className=" font-Quiet_sans text-[#089430] px-3 py-1 rounded-full">
                {currency +
                  " " +
                  (status == "Credit" ? amount.toLocaleString() : "0")}
              </span>
            </Col>

            <Col lg={3} className="text-center">
              <span className=" text-[#D72F2F] px-3 py-1 rounded-full font-Quiet_sans">
                {currency +
                  " " +
                  (status == "Debit" ? amount.toLocaleString() : "0")}
              </span>
            </Col>

            <Col lg={3}>
              <p className="text-[#B0B7CA] text-center font-Quiet_sans">
                {currency + " " + newBalance.toLocaleString()}
              </p>
            </Col>
            <Col lg={3}>
              <p className="text-[#B0B7CA] text-center font-Quiet_sans">
                {description}
              </p>
            </Col>
            <Col lg={3} className="text-center">
              {/* <StatusButton status={status} /> */}
              <p className="text-[#B0B7CA] text-center font-Quiet_sans">
                {status == "Credit" ? (
                  <span className="text-[#03543F] bg-[#DEF7EC] p-2 px-4 rounded-full">
                    Credit
                  </span>
                ) : status == "Debit" ? (
                  <span className="text-[#D72F2F] bg-[#FBEAEA] p-2 px-4 rounded-full">
                    Debit
                  </span>
                ) : (
                  ""
                )}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
