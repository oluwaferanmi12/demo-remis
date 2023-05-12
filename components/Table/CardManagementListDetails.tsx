import React from "react";
import { Row, Col } from "antd";
import { useRouter } from "next/router";

interface CardManagementProp {
  cardType: string;
  username: string;
  locked: boolean;
  cardNumber: string;
  id: string;
}

export const CardManagementListDetails = ({
  cardType,
  username,
  locked,
  cardNumber,
  id,
}: CardManagementProp) => {
  const router = useRouter();
  return (
    <div className="bg-[#202940]  px-6 py-3 text-[#D8DFEE] border-b border-[#ffffff52]">
      <Row>
        <Col xs={23}>
          <Row className="w-full flex items-center ">
            <Col lg={5}>
              <p className="font-Quiet_sans">{username ? username : "-"}</p>
            </Col>
            <Col lg={4} className="text-center">
              <p className="font-Quiet_sans">{cardNumber}</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">{cardType}</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans text-center">
                {locked ? "Inactive" : "Active"}
              </p>
            </Col>
            {/* <Col lg={3}></Col> */}
            <Col lg={6}>
              <div className="flex justify-center font-Quiet_sans">
                <span
                  onClick={() => {
                    router.push(`/card-details?q=${id}`);
                  }}
                  className="bg-[#B0B7CA] cursor-pointer font-Quiet_sans text-[#0D0D0D] p-2 px-3 rounded-sm"
                >
                  Card details
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
