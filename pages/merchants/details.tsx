import { Navbar } from "@/components/Nav/Navbar";
import { SideNav } from "@/components/Nav/SideNav";
import { DetailsDashboard } from "@/components/Text/DetailsDashboard";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { BoxWrapper } from "@/components/Wrapper/BoxWrapper";
import wallet from "@/public/ICONS/SVG/merchant-wallet.svg";
import { Col, Row } from "antd";
import Image from "next/image";
import arrow_down from "@/public/ICONS/SVG/merchant-arrow-down.svg";
import arrow_up from "@/public/ICONS/SVG/merchant-arrow-up.svg";
import { useDispatch } from "react-redux";
import { savePage } from "@/store/reducers/currentPage";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { TableNav } from "@/components/Nav/TableNav";
import { TableHeader } from "@/components/Table/TableHeader";
import { MerchantDetailsNav } from "@/components/Nav/MerchantDetailsNav";
import { MerchantDetailsTableHeader } from "@/components/Table/MerchantDetailsTableHeader";
import { MerchantDetailsData } from "@/components/Table/MerchantDetailsData";
import { apiCall } from "@/apiClient/api";

export interface TransactionProp {
  date: string;
  amount: string;
  status: string;
  referenceNumber: string;
}

interface WalletDataProps {
  currency: string;
  balance: string;
  money_in: string;
  money_out: string;
}

interface MerchantDetailsProps {
  name: string;
}

function Details() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionProp[]>([]);
  const [walletDetail, setWalletDetails] = useState<WalletDataProps>({
    currency: "NGN",
    balance: "",
    money_in: "",
    money_out: "",
  });
  const [merchantDetails, setMerchantDetails] = useState<MerchantDetailsProps>({
    name: "",
  });
  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    const merchant_id = urlParam.get("q");
    console.log(merchant_id);
    apiCall("get", `Admin/Merchant/${merchant_id}`)
      .then((res) => {
        const { merchant, wallet, transactions } = res?.data.data;
        console.log(transactions);
        setTransactions(transactions);
        setMerchantDetails(merchant);
        setWalletDetails(wallet);
      })
      .catch((e) => {
        console.log("error_gotte", e);
      });
    dispatch(savePage("merchant"));
  }, []);

  console.log(transactions);

  return (
    <>
      <Head>
        <title>Merchant details</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex">
        <SideNav />
        <section className={styles.dashboardMainWrapper}>
          <div>
            <Navbar />
          </div>
          <div className="pr-8 pt-3 mb-4">
            <DetailsDashboard
              name={merchantDetails.name}
              subText="Keep up with all merchants record"
            />
          </div>
          <div className="pr-8">
            <div>
              <p className="mb-2 font-Quiet_sans text-[#9299A8] font-semibold tracking-wide">
                Account details
              </p>
            </div>
            <BoxWrapper>
              <Row>
                <Col xs={8}>
                  <div className="border-[#ffffff1a] border-r h-[120px] flex items-center p-4 font-Quiet_sans">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <Image src={wallet} alt="" width={30} height={30} />
                        </div>
                        <div className="text-[#9AA1AE]">
                          <p className="text-sm">Current balance</p>
                          <p className="text-lg">
                            {walletDetail.currency + " " + ((walletDetail.balance.toLocaleString()))}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="bg-[#8991A0] px-4 rounded-sm cursor-pointer py-2">
                          Fund account
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={8}>
                  <div className="border-[#ffffff1a] border-r h-[120px] flex items-center p-4 font-Quiet_sans">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <Image
                            src={arrow_down}
                            alt=""
                            width={30}
                            height={30}
                          />
                        </div>
                        <div className="text-[#9AA1AE]">
                          <p className="text-sm">Money in</p>
                          <p className="text-lg py-1">N 63,483,958.00</p>
                          <p className="text-sm text-[#667084]">
                            <span className="text-[#D72F2F]">20% down </span>
                            since last month
                          </p>
                        </div>
                      </div>
                      {/* <div>
                      <span className="bg-[#8991A0] px-4 rounded-sm cursor-pointer py-2">
                        Fund account
                      </span>
                    </div> */}
                    </div>
                  </div>
                </Col>
                <Col xs={8}>
                  <div className="border-[#ffffff1a] border-r h-[120px] flex items-center p-4 font-Quiet_sans">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <Image src={arrow_up} alt="" width={30} height={30} />
                        </div>
                        <div className="text-[#9AA1AE]">
                          <p className="text-sm">Money in</p>
                          <p className="text-lg py-1">N 63,483,958.00</p>
                          <p className="text-sm text-[#667084]">
                            <span className="text-[#089430]">20% down </span>
                            since last month
                          </p>
                        </div>
                      </div>
                      {/* <div>
                      <span className="bg-[#8991A0] px-4 rounded-sm cursor-pointer py-2">
                        Fund account
                      </span>
                    </div> */}
                    </div>
                  </div>
                </Col>
              </Row>
            </BoxWrapper>

            <TableWrapper>
              <MerchantDetailsNav />
              <MerchantDetailsTableHeader />
              {transactions.map((item, index) => {
                return (
                  <MerchantDetailsData key={index} merchantDetails={item} />
                );
              })}
            </TableWrapper>
          </div>
        </section>
      </main>
    </>
  );
}

export default Details;
