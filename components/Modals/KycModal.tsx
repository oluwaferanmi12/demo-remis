import React from "react";
import Image from "next/image";
import cancelButton from "../../public/ICONS/SVG/modalCancelButton.svg";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { hideKycModal } from "@/store/reducers/handleKycModal";
import { ModalHeader } from "../Text/ModalHeader";
import { BoxWrapper } from "../Wrapper/BoxWrapper";
import kycSideImage from "../../public/ICONS/SVG/money-limit.svg";
import imagePlaceholder from "../../public/ICONS/SVG/image-empty.svg";
import kyc_0 from "@/public/ICONS/SVG/tier_0.svg";
import kyc_1 from "@/public/ICONS/SVG/tier_1.svg";
import kyc_2 from "@/public/ICONS/SVG/tier_2.svg";
import kyc_3 from "@/public/ICONS/SVG/tier_3.svg";
import phone_kyc from "@/public/ICONS/SVG/phone-kyc.svg";

interface KycModalProps {
  kycDetails: KycDetailsProps;
}
interface KycDetailsProps {
  status: string;
  kycIdentity: KycIdentityProps;
}

interface DocumentProps {
  fullUrl: string;
}

interface KycIdentityProps {
  identityType: number;
  identityNumber: string;
  idDocument: DocumentProps;
  doc2Compare: DocumentProps;
  bvn: string;
}

export const KycModal = ({ kycDetails }: KycModalProps) => {
  const dispatch = useDispatch();

  const { identityType, identityNumber, bvn } = kycDetails?.kycIdentity
    ? kycDetails.kycIdentity
    : { identityType: "", identityNumber: "", bvn: "" };

  return (
    <div className="h-screen overflow-y-scroll z-10 bg-[#111827cc] fixed pb-20 flex  flex-col w-screen justify-center">
      <Row justify="center" className="w-full">
        <Col xs={12}>
          <div className="bg-[#202940] p-4 rounded-md relative top-10">
            <div
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => {
                dispatch(hideKycModal());
              }}
            >
              <Image src={cancelButton} alt="" />
            </div>
            <main>
              <div className="mb-6">
                <ModalHeader
                  mainText="View KYC"
                  subText="You can drill down to user to manage any user account here"
                />
              </div>
              <div className="mb-8">
                <BoxWrapper>
                  <Row>
                    <Col xs={12}>
                      <div className="py-4 pl-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="mr-3">
                            <Image src={kycSideImage} alt="" />
                          </div>
                          <div className="font-Quiet_sans text-[#9AA1AE] ">
                            <p>KYC level</p>
                            <p className="text-2xl">
                              {kycDetails.status == "BVNVerified"
                                ? "Tier 1"
                                : kycDetails.status == "PhoneVerified"
                                ? "Tier 2"
                                : kycDetails.status == "Verified"
                                ? "Tier 3"
                                : "No Tier"}
                            </p>
                          </div>
                        </div>

                        <div className="mr-3">
                          <Image
                            src={
                              kycDetails.status === "BVNVerified"
                                ? kyc_1
                                : kycDetails.status == "PhoneVerified"
                                ? kyc_2
                                : kycDetails.status == "Verified"
                                ? kyc_3
                                : kyc_0
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    </Col>

                    <Col xs={12} className="border-l border-[#ffffff33]">
                      <div className="py-4 pl-3 font-Quiet_sans">
                        <div>
                          <span className="text-[#9AA1AE] ">Identity type</span>
                          <span className="text-[#089430]">
                            {" "}
                            -{" "}
                            {identityType === 1
                              ? "NIN"
                              : identityType === 2
                              ? "NATIONAL PASSPORT"
                              : identityType === 3
                              ? "DRIVER'S LICENCE"
                              : "No valid id"}
                          </span>
                        </div>
                        <div>
                          <p className="text-[#9AA1AE] mt-3">
                            {identityNumber ? identityNumber : "No valid id"}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} className="border-t border-[#ffffff33]">
                      <div className="py-4 pl-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="mr-3">
                            <Image src={phone_kyc} alt="" />
                          </div>
                          <div className="font-Quiet_sans text-[#9AA1AE] ">
                            <p>Phone number</p>
                            <p className="text-2xl">08024127843</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      className="border-l border-t border-[#ffffff33] pt-1"
                    >
                      <div className="py-4 flex-col items-center  pl-3 font-Quiet_sans">
                        <div className="text-[#9AA1AE]">BVN number</div>
                        <div>
                          <p className="text-[#9AA1AE] text-2xl">
                            {bvn ? bvn : "-"}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </BoxWrapper>
              </div>

              <div className="font-Quiet_sans">
                <p className="text-[#9299A8]  text-2xl font-bold">
                  Document submitted
                </p>
                <p className="text-[#8991A0] my-2">
                  Manage all documents submitted
                </p>
              </div>

              <BoxWrapper>
                <div>
                  <Row className="p-3 font-Quiet_sans">
                    <Col xs={12} className="p-3">
                      <div>
                        <p className="text-[#9AA1AE] mb-2 font-Quiet_sans">
                          You verify
                        </p>
                        <div className="bg-[#1A2035] w-full h-[200px]  rounded-xl flex justify-center items-center flex-col overflow-hidden ">
                          {kycDetails?.kycIdentity?.idDocument?.fullUrl ? (
                            <img
                              src={kycDetails?.kycIdentity?.idDocument?.fullUrl}
                              className="w-full h-full"
                              alt=""
                            />
                          ) : (
                            <Image src={imagePlaceholder} alt="" />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} className="p-3">
                      <div>
                        <p className="text-[#9AA1AE] mb-2 font-Quiet_sans">
                          Company verify
                        </p>
                        <div className="bg-[#1A2035] w-full h-[200px]  rounded-xl flex justify-center items-center flex-col overflow-hidden">
                          {kycDetails?.kycIdentity?.doc2Compare?.fullUrl ? (
                            <img
                              src={
                                kycDetails?.kycIdentity?.doc2Compare?.fullUrl
                              }
                              className="w-full h-full"
                              alt=""
                            />
                          ) : (
                            <Image src={imagePlaceholder} alt="" />
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </BoxWrapper>
            </main>
          </div>
        </Col>
      </Row>
    </div>
  );
};
