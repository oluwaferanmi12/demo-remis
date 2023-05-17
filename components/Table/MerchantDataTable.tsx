import React from "react";
import Image from "next/image";
import { Row, Col } from "antd";
import { DetailsButton, SuspendButton } from "../Buttons/Buttons";
import three_dots from "../../public/ICONS/SVG/three_dots.svg";
import { MerchantData } from "@/pages/merchants";

interface MerchantProps {
    merchantData: MerchantData
}

function MerchantDataTable({
  merchantData
}: MerchantProps) {
  const isActive = true;
  return (
    <div className="bg-[#202940] ">
      <Row>
        <Col xs={23}>
          <Row className="w-full  py-6 text-[#D8DFEE] px-6 border-b border-[#ffffff52] ">
            <Col lg={6}>
              <p className="font-Quiet_sans">{merchantData.name ? merchantData.name : ""}</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans">{merchantData.email}</p>
            </Col>

            <Col lg={3}>
              <p className="font-Quiet_sans text-center">{merchantData.country}</p>
            </Col>

            <Col lg={3} className="text-center">
              <p
                className={`font-Quiet_sans ${
                  merchantData.active ? "text-[#089430]" : "text-[#C42B2B]"
                }`}
              >
                {merchantData.active ? "Verified" : "UnVerified"}
              </p>
            </Col>
            <Col lg={5} className="text-center">
              <DetailsButton
                text="Details"
                id={merchantData.id}
                url={`/merchants/details?q=${merchantData.id}`}
              />
            </Col>
            
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default MerchantDataTable;
