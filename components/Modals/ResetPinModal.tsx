import { Col, Row } from "antd";
import React, { useRef, useState, useEffect } from "react";
import cancelButton from "@/public/ICONS/SVG/modalCancelButton.svg";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { hideResetPinModal } from "@/store/reducers/handleResetPin";
import { ModalHeader } from "../Text/ModalHeader";
import { PinInput } from "../Inputs/PinInput";
import { apiCall } from "@/apiClient/api";
import { logOutUser } from "@/utils/logOutUser";
import { useRouter } from "next/router";

export const ResetPinModal = ({ cardId }: { cardId: string | null }) => {
  const dispatch = useDispatch();
  const [pinArray, setPinArray] = useState<string[]>(new Array(4).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [buttonActive, setButtonActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeIndex]);

  const handleSubmitResetPin = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonActive(true);
    const newPin = pinArray.join("");
    const oldPin = "0000";
    const payload = { newPin, oldPin };
    apiCall("post", `Admin/ChangePin/${cardId}`, payload)
      .then((res) => {
        setSuccessMessage("Pin changed");
        setErrorMessage("");
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          logOutUser();
          router.push("/admin/sign-in");
        } else if (e.response?.status === 404) {
          setErrorMessage("Card Not Found");
        } else {
          setErrorMessage("Oops!, Error occured");
        }
      })
      .finally(() => {
        setButtonActive(false);
      });
  };

  return (
    <div className="h-screen overflow-y-scroll z-10 bg-[#111827cc] fixed pb-20 flex  flex-col w-screen justify-center">
      <Row justify="center" className="w-full">
        <Col xs={12}>
          <div className="bg-[#202940] p-4 rounded-md relative top-10 pb-16">
            <div
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => {
                dispatch(hideResetPinModal());
              }}
            >
              <Image src={cancelButton} alt="" />
            </div>
            <main>
              <div className="mb-16">
                <ModalHeader
                  mainText="Reset card pin"
                  subText="Reset card pin"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-[#8991A0] font-Quiet_sans mb-4">Enter pin</p>
                <div className="flex justify-center">
                  <form action="" onSubmit={handleSubmitResetPin}>
                    {pinArray.map((item, index) => {
                      return (
                        <PinInput
                          otpArray={pinArray}
                          handleActiveIndex={setActiveIndex}
                          handleOtpArray={setPinArray}
                          inputValue={item}
                          label=""
                          key={index}
                          currentIndex={index}
                          ref={activeIndex == index ? inputRef : null}
                        />
                      );
                    })}
                    <div className="text-center">
                      <input
                        disabled={buttonActive}
                        type="submit"
                        value={buttonActive ? "Loading..." : "Submit"}
                        className="mt-8 bg-white border border-[#D9DBE0] px-20 py-2 font-Quiet_sans rounded-lg"
                      />
                    </div>
                    <div>
                      {errorMessage && (
                        <p className="font-Quiet_sans text-[#D72F2F] text-center mt-2">
                          {errorMessage}
                        </p>
                      )}
                      {successMessage && (
                        <p className="font-Quiet_sans text-[#089430] text-center mt-2">
                          {successMessage}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </Col>
      </Row>
    </div>
  );
};
