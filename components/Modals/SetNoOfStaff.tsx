import React from "react";
import { useDispatch } from "react-redux";
import marks from "../../public/ICONS/SVG/marks.svg";
import { Row, Col } from "antd";
import Image from "next/image";

import cancelButton from "../../public/ICONS/SVG/modalCancelButton.svg";
import { ModalHeader } from "../Text/ModalHeader";
import alert from "../../public/ICONS/SVG/alert.svg";
import { handleModalDisable } from "@/store/reducers/handleNoOfStaff";

export const SetNoOfStaff = () => {
  const dispatch = useDispatch();
  return (
    <div className=" h-screen z-10 bg-[#111827cc] fixed flex flex-col justify-center items-center w-full">
      <Row justify="center" className="w-full">
        <Col xs={12}>
          <div className="bg-[#202940] p-4 rounded-md relative top-10 pb-24">
            <div
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => {
                dispatch(handleModalDisable());
              }}
            >
              <Image src={cancelButton} alt="" />
            </div>

            <main>
              <div className="mb-6">
                <ModalHeader
                  mainText="Set number of staffs"
                  subText="Set the number of staffs under company"
                />
              </div>

              <div className="bg-[#2D384B] w-4/5 mx-auto flex items-center justify-center py-5 rounded-md">
                <div className="mr-4 ">
                  <Image src={alert} alt="" />
                </div>
                <p className="font-Quiet_sans text-[#8991A0]">
                  Current number of staffs is 165
                </p>
              </div>

              <Row justify={"center"}>
                <Col xs={12}>
                  <form action="" className="mt-10">
                    <div>
                      <p className="font-Quiet_sans text-[#8991A0] mb-2">
                        Set number of staffs
                      </p>
                      <div>
                        <input
                          type="text"
                          className="w-full bg-[#667084] p-3 rounded-md focus:outline-none placeholder:text-[#9AA1AE] text-[#9aa1ae] border border-[#D0D5DD] font-Quiet_sans "
                          placeholder="Enter number"
                        />
                      </div>

                      <div className="mt-5">
                        <input
                          type="submit"
                          value={"Submit"}
                          className="w-full bg-white font-Quiet_sans p-3 rounded-md"
                        />
                      </div>
                    </div>
                  </form>
                </Col>
              </Row>
            </main>
          </div>
        </Col>
      </Row>
    </div>
  );
};
