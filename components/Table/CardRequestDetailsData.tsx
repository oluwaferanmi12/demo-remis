import React from "react";
import { Row, Col } from "antd";
import input_error from "@/public/ICONS/SVG/input_error.svg";
import Image from "next/image";
import input_mark from "@/public/ICONS/SVG/input-mark.svg";

interface CardRequestProps {
  address: string;
  email: string;
  cardType: string;
  handleCardId: (value: string) => void;
  cardNumberUnique: boolean;
  handleActiveIndex: (value: number) => void;
  currentIndex: number;
  activeIndex: number;
  verifiedNumbers: VerifiedNumbersProps[];
  name:string;
}

interface VerifiedNumbersProps {
  index: number;
  cardId: string;
  ownerId: string;
  validated: boolean;
}

export const CardRequestDetailsData = ({
  address,
  name,
  email,
  cardType,
  handleCardId,
  cardNumberUnique,
  handleActiveIndex,
  currentIndex,
  activeIndex,
  verifiedNumbers,
}: CardRequestProps) => {

  return (
    <div className="bg-[#202940]  px-6 py-3 text-[#D8DFEE] border-b border-[#ffffff52]">
      <Row>
        <Col xs={23}>
          <Row className="w-full flex items-center ">
            <Col lg={5}>
              <p className="font-Quiet_sans">{name}</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans text-center">{email}</p>
            </Col>
            <Col lg={5}>
              <p className="font-Quiet_sans text-center">{address ? address: "-"}</p>
            </Col>
            <Col lg={4}>
              <p className="font-Quiet_sans text-center">{cardType}</p>
            </Col>
            <Col lg={4}>
              <div className="flex  items-center relative">
                <div>
                  <input
                    className="bg-[#111827] w-full  px-3 p-2 rounded-lg focus:outline-none"
                    placeholder="Enter card number"
                    onChange={(e) => {
                      handleActiveIndex(currentIndex);
                      handleCardId(e.target.value);
                    }}
                  />
                </div>

                <div className="absolute right-3">
                  {verifiedNumbers.find(
                    (item, index) => item.index == currentIndex
                  ) ? (
                    verifiedNumbers[
                      verifiedNumbers.findIndex(
                        (item, index) => item.index == currentIndex
                      )
                    ].validated ? (
                      <div>
                        <Image src={input_mark} alt="" width={20} height={20} />
                      </div>
                    ) : (
                      <>
                        <Image
                          src={input_error}
                          alt="test_image"
                          width={20}
                          height={20}
                        />
                      </>
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </Col>
            {/* <Col lg={3}>
              <div className="flex items-center justify-center">
                <div className="mr-4 cursor-pointer">
                  <Image src={marked} alt="" />
                </div>
                <div className="cursor-pointer">
                  <Image src={decline_image} alt="" />
                </div>
              </div>
            </Col> */}

            {/* <Col lg={3}></Col> */}
            {/* <Col lg={1}>
              <div className="flex justify-center font-Quiet_sans">
                <p className="bg-[#8DCEA0] text-[#089430] py-2 px-4 rounded-lg cursor-pointer">
                  Accept request
                </p>
                <p className="py-2 ml-4 text-[#D72F2F] cursor-pointer">
                  Decline
                </p>
              </div>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
