import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import marks from "../../public/ICONS/SVG/marks.svg";
import { Row, Col } from "antd";
import Image from "next/image";
import { hideLimitModal } from "@/store/reducers/handleLimitModal";
import cancelButton from "../../public/ICONS/SVG/modalCancelButton.svg";
import { ModalHeader } from "../Text/ModalHeader";
import alert from "../../public/ICONS/SVG/alert.svg";
import { apiCall } from "@/apiClient/api";
import { useRouter } from "next/router";
import { logOutUser } from "@/utils/logOutUser";
import { AppDispatch } from "@/store/store";
import { logoutUser } from "@/store/reducers/user";

interface Wallet {
  dailyLimit: string;
  id: string;
  balance: string;
  target: string;
  suspended: boolean;
  currency: string;
}

export const SetLimitModal = ({
  limitAmount,
  walletId,
  name,
  activeWallet,
  handleActiveWallet,
  modifyWallet,
  type,
}: {
  limitAmount: string;
  name: string;
  walletId: string;
  activeWallet: Wallet;
  type?: string;
  handleActiveWallet: (value: Wallet) => void;
  modifyWallet: (value: string, amount: number) => void;
}) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSetLimit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (walletId) {
      setClicked(true);
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const amount = +data.amount;
      if (!amount || isNaN(amount)) {
        return;
      }

      apiCall("post", `/Admin/Wallet/DailyLimit/${walletId}?amount=${+amount}`)
        .then((res) => {
          setSuccess(true);
          modifyWallet(walletId, +amount);
          if(type !== "company"){
            handleActiveWallet({
              ...activeWallet,
              dailyLimit: amount.toString(),
            });
          }
          
          dispatch(hideLimitModal());
        })
        .catch((e) => {
          setFail(true);
          if (e.response?.status === 401) {
            dispatch(logoutUser());
            logOutUser();
            router.push("/admin/sign-in");
          }
        })
        .finally(() => {
          setClicked(false);
        });
    }
  };

  return (
    <div className=" h-screen z-10 bg-[#111827cc] fixed flex flex-col justify-center items-center w-full">
      <Row justify="center" className="w-full">
        <Col xs={12}>
          <div className="bg-[#202940] p-4 rounded-md relative top-10 pb-24">
            <div
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => {
                dispatch(hideLimitModal());
              }}
            >
              <Image src={cancelButton} alt="" />
            </div>

            <main>
              <div className="mb-6">
                <ModalHeader
                  mainText="Set limit"
                  subText="Set daily transaction limit"
                />
              </div>

              <div className="bg-[#2D384B] w-4/5 mx-auto flex items-center justify-center py-5 rounded-md">
                <div className="mr-4 ">
                  <Image src={alert} alt="" />
                </div>
                <p className="font-Quiet_sans text-[#8991A0]">
                  {name}’s limit is {limitAmount ? limitAmount : "not set"}
                </p>
              </div>

              <Row justify={"center"}>
                <Col xs={12}>
                  <form action="" onSubmit={handleSetLimit} className="mt-10">
                    <div>
                      <p className="font-Quiet_sans text-[#8991A0] mb-2">
                        Change daily transfer limit
                      </p>
                      <div>
                        <input
                          type="text"
                          className="w-full bg-[#667084] p-3 rounded-md focus:outline-none placeholder:text-[#9AA1AE] text-[#9aa1ae] border border-[#D0D5DD] font-Quiet_sans "
                          placeholder="Enter amount"
                          name="amount"
                        />
                      </div>

                      <div className="mt-5">
                        <input
                          type="submit"
                          value={clicked ? "loading..." : "Submit"}
                          disabled={clicked}
                          className="w-full bg-white font-Quiet_sans p-3 rounded-md"
                        />
                      </div>
                      {success && (
                        <p className="text-[#089430] font-Quiet_sans">
                          Limit changed successfully
                        </p>
                      )}
                      {fail && (
                        <p className="text-[#D72F2F] font-Quiet_sans">
                          Unable to process request
                        </p>
                      )}
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
