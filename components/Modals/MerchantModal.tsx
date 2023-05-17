import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "antd";
import Image from "next/image";

import cancelButton from "../../public/ICONS/SVG/modalCancelButton.svg";

import { AppDispatch } from "@/store/store";

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
import { SingleMerchantObject } from "@/pages/merchants";
import moment from "moment";

interface MerchantModalProp {
  merchantObject: SingleMerchantObject;
  handleCloseModal: (value: boolean) => void;
}

export const MerchantModal = ({
  merchantObject,
  handleCloseModal,
}: MerchantModalProp) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="  z-10 bg-[#111827cc] fixed flex min-h-[100vh] h-[150vh] overflow-y-scroll border w-full " >
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
                  mainText="Fund Wallet"
                  subText="Fund your wallet with any of the option below"
                />
              </div>

              <div className="m-2 relative">
                <div className="mb-[3rem] mt-3  flex justify-center items-center">
                  <p className="text-[#9299A8] font-Quiet_sans text-xl flex justify-center items-center bg-[#2D384B] w-[645px] h-[52px]">
                    How much would you like to fund your wallet with ?
                  </p>
                </div>
                <div className="flex  items-center absolute " style={{
                top:"42%",
                left:"31%"
                }}>
                  <p className="text-[#9299A8] font-Quiet_sans text-xl">
                    Amount to fund
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex mb-[1rem]">
                    <div className="w-[59px] h-[46px] rounded-sm bg-[#111827] text-[#9299A8] font-Quiet_sans text-xl flex justify-center items-center">
                      NGN
                    </div>
                    <input className="w-[313px] h-[46px] rounded-sm bg-[#667084] text-[#9299A8] font-Quiet_sans text-xl "
                    placeholder="Enter amount" style={{
                      textAlign:"center",
                    }}
                    >
                     
                    </input>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mb-[8rem]">
               <button className="text-[#111827] font-Quiet_sans text-xl flex justify-center items-center bg-[#FFFFFF] w-[372px] h-[42px]">
                Submit
               </button>
              </div>
            </main>
          </div>
        </Col>
      </Row>
    </div>
  );
};
