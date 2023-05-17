import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import {
  DetailsButton,
  SuspendButton,
  UnSuspendButton,
} from "../Buttons/Buttons";
import three_dots from "../../public/ICONS/SVG/three_dots.svg";
import Image from "next/image";
import moment from "moment";
import { TransactionProp } from "@/pages/merchants/details";

interface TableDataProps {
  merchantDetails: TransactionProp;
}

export const MerchantDetailsData = ({ merchantDetails }: TableDataProps) => {
  const [showDetails, setShowDetails] = useState();
  return (
    <div className="border-b border-[#ffffff52]">
      <Row>
        <Col xs={23}>
          <Row className="w-full  py-6 text-[#D8DFEE] px-6   ">
            <Col lg={3}>
              <p className="font-Quiet_sans text-[#B0B7CA]">
                {moment(merchantDetails.date).format("YY-MM-DD , HH:mm")}
              </p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-[#B0B7CA]">
                {merchantDetails.referenceNumber}
              </p>
            </Col>
            <Col lg={3}>
              <div className=" font-Quiet_sans">
                <p className="font-Quiet_sans text-center text-[#B0B7CA] ">
                  Airtime
                </p>
              </div>
            </Col>
            <Col lg={3} className="text-center">
              <p className="font-Quiet_sans text-[#089430]">
                {merchantDetails.status == "Credit"
                  ? merchantDetails.amount
                  : "-"}
                {/* {moment(date).format("YY-MM-DD, HH:mm")} */}
              </p>
            </Col>
            <Col lg={3} className="text-center">
              <p className="font-Quiet_sans text-[#D72F2F]">
                {merchantDetails.status == "Debit"
                  ? merchantDetails.amount
                  : "-"}
                {/* {moment(date).format("YY-MM-DD, HH:mm")} */}
              </p>
            </Col>
            <Col lg={3} className="text-center">
              <p className="font-Quiet_sans text-[#B0B7CA]">
                Akinromade Ola
                {/* {moment(date).format("YY-MM-DD, HH:mm")} */}
              </p>
            </Col>
            <Col lg={3} className="text-center">
              <p className="font-Quiet_sans text-[#B0B7CA]">
                Successful
                {/* {moment(date).format("YY-MM-DD, HH:mm")} */}
              </p>
            </Col>
            <Col lg={3} className="text-center ">
              {merchantDetails.status == "Debit" ? (
                <span className="font-Quiet_sans text-[#D72F2F] bg-[#FBEAEA] px-4 rounded-full py-1">
                  Debit
                </span>
              ) : (
                <span className="font-Quiet_sans text-[#03543F] bg-[#DEF7EC] px-4 rounded-full py-1">
                  Credit
                </span>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
