import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "antd";
import Image from "next/image";
import { hideLimitModal } from "@/store/reducers/handleLimitModal";
import cancelButton from "../../public/ICONS/SVG/modalCancelButton.svg";

import { AppDispatch } from "@/store/store";
import { logoutUser } from "@/store/reducers/user";
import { ModalHeader } from "../Text/ModalHeader";
import voucherPinImage from "@/public/ICONS/SVG/Vouchers/pin.svg";
import status from "@/public/ICONS/SVG/Vouchers/status.svg";
import voucher_amount from "@/public/ICONS/SVG/Vouchers/voucher_amount.svg";
import { BoxWrapper } from "../Wrapper/BoxWrapper";
import { VoucherContainer } from "../Text/VoucherContainer";
import voucher_date from "@/public/ICONS/SVG/Vouchers/date_generated.svg";
import expiry_icon from "@/public/ICONS/SVG/Vouchers/expiry.svg";
import new_balance from "@/public/ICONS/SVG/Vouchers/balance.svg";
import product_purchased from "@/public/ICONS/SVG/Vouchers/product.svg";
import staff from "@/public/ICONS/SVG/Vouchers/staff.svg";
import vehicle from "@/public/ICONS/SVG/Vouchers/vehicle_id.svg";
import product_dispense from "@/public/ICONS/SVG/Vouchers/tank.svg";
import location from "@/public/ICONS/SVG/Vouchers/station.svg";
import { SingleVoucherObject } from "@/pages/vouchers";
import moment from "moment";

interface VoucherModalProp {
  voucherObject: SingleVoucherObject;
  handleCloseModal: (value: boolean) => void;
}

export const VoucherModal = ({
  voucherObject,
  handleCloseModal,
}: VoucherModalProp) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="  z-10 bg-[#111827cc] fixed flex min-h-[100vh] h-[150vh] overflow-y-scroll border w-full">
      <Row justify="center" className="w-full">
        <Col xs={16} className="">
          <div className="bg-[#202940] p-4 mt-4 rounded-md ">
            <div
              className="absolute top-4 right-0 cursor-pointer"
              onClick={() => {
                handleCloseModal(false);
              }}
            >
              <Image src={cancelButton} alt="" />
            </div>
            <main>
              <div className="mb-6">
                <ModalHeader
                  mainText="Voucher details"
                  subText="You can drill down to view voucher details "
                />
              </div>
              <div className="m-2">
                <div className="mb-3">
                  <p className="text-[#9299A8] font-Quiet_sans text-xl">
                    Voucher details
                  </p>
                </div>
                <BoxWrapper>
                  <Row>
                    <Col xs={8} className="border-r border-[#ffffff1a]">
                      <VoucherContainer
                        imgUrl={voucherPinImage}
                        subText={voucherObject.pin}
                        mainText={"Voucher Pin"}
                        borderBottom={true}
                      />
                      <VoucherContainer
                        imgUrl={status}
                        subText={voucherObject.isUsed ? "Used" : "Unused"}
                        mainText="Status"
                        borderBottom={false}
                      />
                    </Col>
                    <Col xs={8} className="border-r border-[#ffffff1a]">
                      <VoucherContainer
                        imgUrl={voucher_amount}
                        subText={voucherObject.amount.toLocaleString()}
                        mainText="Voucher amount"
                        borderBottom={true}
                      />
                      <VoucherContainer
                        imgUrl={status}
                        subText="Fueling"
                        mainText="Category"
                        borderBottom={false}
                      />
                    </Col>
                    <Col xs={8}>
                      <VoucherContainer
                        imgUrl={voucher_date}
                        mainText="Date Generated"
                        subText={moment(voucherObject.dateGenerated).format(
                          "YY-MM-DD, HH:mm"
                        )}
                        borderBottom={true}
                      />
                      <VoucherContainer
                        imgUrl={expiry_icon}
                        subText={moment(voucherObject.expiryDate).format(
                          "YY-MM-DD, HH:mm"
                        )}
                        mainText="Expiry date"
                        borderBottom={false}
                      />
                    </Col>
                  </Row>
                </BoxWrapper>
              </div>
              <div className="m-2 ">
                <div className="mb-3 mt-3">
                  <p className="text-[#9299A8] font-Quiet_sans text-xl">
                    Consumption details
                  </p>
                </div>

                {voucherObject.isUsed ? (
                  <BoxWrapper>
                    <Row>
                      <Col xs={8} className="border-r border-[#ffffff1a]">
                        <VoucherContainer
                          imgUrl={voucher_amount}
                          subText={voucherObject.amount.toLocaleString()}
                          mainText={"Amount consumed"}
                          borderBottom={true}
                        />
                        <VoucherContainer
                          imgUrl={product_purchased}
                          subText="AGO"
                          mainText="Product purchased"
                          borderBottom={true}
                        />
                        <VoucherContainer
                          imgUrl={staff}
                          subText="Abdul habeeb"
                          mainText="Staff name"
                          borderBottom={false}
                        />
                      </Col>
                      <Col xs={8} className="border-r border-[#ffffff1a]">
                        <VoucherContainer
                          imgUrl={new_balance}
                          subText="NGN 2000"
                          mainText="New balance"
                          borderBottom={true}
                        />
                        <VoucherContainer
                          imgUrl={voucher_amount}
                          subText="NGN 195"
                          mainText="Price per liter"
                          borderBottom={true}
                        />
                        <VoucherContainer
                          imgUrl={vehicle}
                          subText="AAA 123 KJA"
                          mainText="Vehicle id"
                          borderBottom={false}
                        />
                      </Col>
                      <Col xs={8}>
                        <VoucherContainer
                          imgUrl={voucher_date}
                          mainText="Date Consumed"
                          subText={moment(voucherObject.dateConsumed).format(
                            "YY-MM-DD, HH:mm"
                          )}
                          borderBottom={true}
                        />
                        <VoucherContainer
                          imgUrl={product_dispense}
                          subText="20.56 liters"
                          mainText="Product dispensed per liter"
                          borderBottom={true}
                        />
                        <VoucherContainer
                          imgUrl={location}
                          subText="223 Alagomeji, yaba, Lagos"
                          mainText="Station"
                          borderBottom={false}
                        />
                      </Col>
                    </Row>
                  </BoxWrapper>
                ) : (
                  <div className="border border-[#ffffff33] flex justify-center items-center h-[200px]">
                    <p className="font-Quiet_sans text-[#9299A8]">
                      No consumption details
                    </p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </Col>
      </Row>
    </div>
  );
};
