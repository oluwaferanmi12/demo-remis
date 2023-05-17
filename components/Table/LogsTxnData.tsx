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
import eye from "@/public/ICONS/SVG/eye.svg"

interface TableDataProps {
  merchantDetails?: TransactionProp;
}

export const LogsTxnData = ({ merchantDetails }: TableDataProps) => {
  const [showDetails, setShowDetails] = useState();
  return (
    <div className="border-b border-[#ffffff52]">
      <Row>
        <Col xs={23}>
          <Row className="w-full  py-6 text-[#D8DFEE] px-6   ">
            <Col lg={4}>
              <p className="font-Quiet_sans text-[#B0B7CA]">
                {/* {moment(merchantDetails.date).format("YY-MM-DD , HH:mm")} */}
                Apr 19,2023 11:20
              </p>
            </Col>
            <Col lg={3}>
              <p className="font-Quiet_sans text-[#B0B7CA]">
                {/* {moment(merchantDetails.date).format("YY-MM-DD , HH:mm")} */}
                Voucher Consumption
              </p>
            </Col>
            <Col lg={3} className="text-center">
              <span className="font-Quiet_sans text-[#D72F2F] bg-[#FBEAEA] rounded-full py-1 px-3">
                {/* {moment(merchantDetails.date).format("YY-MM-DD , HH:mm")} */}
                Error
              </span>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-[#B0B7CA] text-center">
                {/* {moment(merchantDetails.date).format("YY-MM-DD , HH:mm")} */}
                Apr 22, 2023 8:50
              </p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-[#B0B7CA] text-center">
                {/* {moment(merchantDetails.date).format("YY-MM-DD , HH:mm")} */}
                Flutterwave
              </p>
            </Col>
            <Col lg={5} className="text-center">
              <span className="relative font-Quiet_sans px-10 py-3 text-[#B0B7CA] text-center border border-[#ACB2BD] rounded-lg cursor-pointer">
                {/* {moment(merchantDetails.date).format("YY-MM-DD , HH:mm")} */}
                <span className="absolute left-2  top-2">
                  <Image src={eye} alt="" />
                </span>
                View message
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
