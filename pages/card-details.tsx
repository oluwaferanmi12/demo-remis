import { savePage } from "@/store/reducers/currentPage";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import Head from "next/head";
import { SideNav } from "@/components/Nav/SideNav";
import styles from "@/styles/Home.module.css";
import { Navbar } from "@/components/Nav/Navbar";
import { DetailsDashboard } from "@/components/Text/DetailsDashboard";
import Image from "next/image";
import card from "@/public/IMAGES/Plain-remis-card 2.svg";
import money_in from "@/public/ICONS/SVG/money-in.svg";
import money_out from "@/public/ICONS/SVG/money-out.svg";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { CardDetailsNav } from "@/components/Nav/CardDetailsNav";
import { CardDetailsHeader } from "@/components/Table/CardDetailsHeader";
import { CardDetailsData } from "@/components/Table/CardDetailsData";
import { ResetPinModal } from "@/components/Modals/ResetPinModal";
import { RootState } from "@/store/store";
import { showResetPinModal } from "@/store/reducers/handleResetPin";
import { apiCall } from "@/apiClient/api";
import moment from "moment";
import paginateFirst from "@/public/ICONS/SVG/paginateFirst.svg";
import paginateLast from "@/public/ICONS/SVG/paginateLast.svg";
import paginatePrevious from "@/public/ICONS/SVG/paginatePrevious.svg";
import paginateNext from "@/public/ICONS/SVG/paginateNext.svg";
import { TableEmptyState } from "@/components/States/TableEmptyState";
import { TableLoading } from "@/components/States/TableLoading";
import { ErrorState } from "@/components/States/ErrorState";

function CardDetails() {
  interface CardData {
    username: string;
    cardNumber: string;
    expiryDate: string;
    billingAddress: string | null | BillingAddressProps;
    currency: string;
    locked: boolean;
    id: string;
  }

  interface BillingAddressProps {
    billing_address1: string;
  }
  interface CardTransactionProps {
    amount: string;
    description: string;
    date: string;
    transactionReference: string;
    newBalance: string;
    category: string;
    type: string;
  }

  interface MoneyFlowProps {
    inflow: string;
    outflow: string;
  }
  const router = useRouter();
  const dispatch = useDispatch();
  const { resetPinModalActive } = useSelector(
    (state: RootState) => state.resetPinReducer
  );
  const [cardDate, setCardData] = useState<CardData>({
    username: "",
    cardNumber: "",
    expiryDate: "",
    billingAddress: "",
    currency: "",
    locked: false,
    id: "",
  });
  const [moneyFlow, setMoneyFlow] = useState<MoneyFlowProps>({
    inflow: "",
    outflow: "",
  });

  const [cardTransactions, setCardTransactions] = useState<
    CardTransactionProps[]
  >([]);

  const [query, setQuery] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [paginationValues, setPaginationValues] = useState<number[]>([]);
  const [currentPagination, setCurrentPagination] = useState(0);
  const [paginationsShown, setPaginationsShown] = useState<(number | string)[]>(
    []
  );
  const pageMounted = useRef(false);
  const [paginationClicked, setPaginationClicked] = useState(false);
  const [urlValue, setUrlValue] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(true);
  const [transactionError, setTransactionError] = useState(false);

  const sortCurrentPagination = (
    totalArray: (number | string)[],
    currentPagination: number,
    totalPaginations: number
  ) => {
    // Try to slice from the current to the last and see if the remaining value is less greater than 3
    const tArray = totalArray;
    // get the current index of the currentPage
    const currentIndex = tArray.indexOf(currentPagination);
    const mArray = tArray.slice(currentIndex);

    if (mArray.length > 3) {
      const arrayToShow = mArray.splice(0, 3);
      arrayToShow.push("...");
      arrayToShow.push(totalPaginations);
      setPaginationsShown(arrayToShow);
    } else {
      setPaginationsShown(mArray);
    }
  };
  const checkForSlice = (): boolean => {
    const rArray = paginationValues.slice(
      paginationValues.indexOf(currentPagination)
    );

    return rArray.length >= 3 ? true : false;
  };

  useEffect(() => {
    if (pageMounted.current) {
      const urlQuery = new URLSearchParams(window.location.search);
      apiCall(
        "get",
        `Card/Transactions/${urlQuery.get(
          "q"
        )}?Query=${query}&StartDate=${startDate}&EndDate=${endDate}&Page=${currentPagination}&PageLimit=${2}`
      )
        .then((res) => {
          setCardTransactions(res?.data.data.transactions.data);
          const { pagination } = res?.data.data.transactions;
          const paginationArray = [];
          const { totalData, currentPage, totalPages } = pagination;
          for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(i);
          }
          setPaginationValues(paginationArray);
          sortCurrentPagination(paginationArray, currentPage, totalPages);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setPaginationClicked(false);
        });
    }
  }, [paginationClicked]);

  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search);

    dispatch(savePage("card_management"));
    apiCall("get", `Card/Details/${urlQuery.get("q")}`)
      .then((res) => {
        setCardData(res?.data.data.card);
        setMoneyFlow({
          inflow: res?.data.data.inflow,
          outflow: res?.data.data.outflow,
        });
      })
      .catch((e) => {})
      .finally(() => {
        setUrlValue(urlQuery.get("q"));
        setIsLoading(false);
        pageMounted.current = true;
      });
  }, []);

  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search);
    apiCall(
      "get",
      `Card/Transactions/${urlQuery.get(
        "q"
      )}?Query=${query}&StartDate=${startDate}&EndDate=${endDate}&Page=${1}&PageLimit=${2}`
    )
      .then((res) => {
        setCurrentPagination(1);
        setCardTransactions(res?.data.data.transactions.data);
        const { pagination } = res?.data.data.transactions;
        const paginationArray = [];
        const { totalData, currentPage, totalPages } = pagination;
        for (let i = 1; i <= totalPages; i++) {
          paginationArray.push(i);
        }
        setPaginationValues(paginationArray);
        sortCurrentPagination(paginationArray, currentPage, totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [query, startDate, endDate]);

  const handleFreezeWallet = () => {
    if (cardDate.locked) {
      apiCall("post", `Admin/Card/UnBlock/${cardDate.id}`)
        .then((res) => {
          console.log("success", res);
        })
        .catch((e) => {
          console.log("error", e);
        });
    } else {
      apiCall("post", `Admin/Card/Block/${cardDate.id}`)
        .then((res) => {
          console.log("success", res);
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  };

  return (
    <div>
      <Head>
        <title>Card Details</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex">
        <SideNav />
        {resetPinModalActive && <ResetPinModal cardId={cardDate.cardNumber} />}

        <main className={styles.dashboardMainWrapper}>
          <div>
            <Navbar />
          </div>
          <div className="pr-8">
            <div className="my-2">
              <DetailsDashboard
                name="Card details"
                subText="You can drill down to user to manage any user account here"
              />
            </div>

            <div>
              <Row>
                <Col
                  xs={7}
                  className="border border-[#ffffff33] rounded-xl px-4 mt-2"
                >
                  <div className=" py-4 flex justify-center flex-col">
                    <div className="flex justify-center">
                      <Image src={card} alt="" />
                    </div>
                    <div className="flex justify-between mt-4">
                      <p
                        className={` cursor-pointer ${"bg-[#F3BFBF] text-[#D72F2F]"} px-12 py-3 rounded-md`}
                      >
                        Suspend
                      </p>

                      {cardDate.locked ? (
                        <p
                          className={` cursor-pointer bg-transparent border  px-8 py-3 rounded-md  border-[#089430] text-[#089430] 
                    `}
                          onClick={() => {
                            handleFreezeWallet();
                          }}
                        >
                          Unfreeze card
                        </p>
                      ) : (
                        <p
                          className={` cursor-pointer bg-transparent border  px-8 py-3 rounded-md  border-[#d72f2f] text-[#d72f2f] 
                    `}
                          onClick={() => {
                            handleFreezeWallet();
                          }}
                        >
                          Freeze card
                        </p>
                      )}
                    </div>
                    <div className="bg-[#202940] p-4 mt-5 text-[#D9DBE0] rounded-lg">
                      <div className="flex font-Quiet_sans pb-3">
                        <p>Card name:</p>
                        <p className="ml-2">{cardDate.username}</p>
                      </div>
                      <div className="flex font-Quiet_sans pb-3">
                        <p>Card number:</p>
                        <p className="ml-2">
                          {cardDate.cardNumber ? cardDate.cardNumber : ""}
                        </p>
                      </div>
                      <div className="flex font-Quiet_sans pb-3">
                        <p>Expiry date:</p>
                        <p className="ml-2">
                          {cardDate.expiryDate
                            ? moment(cardDate.expiryDate).format(
                                "YY-MM-DD, HH:mm"
                              )
                            : cardDate.expiryDate}
                        </p>
                      </div>
                      <div className="flex font-Quiet_sans pb-3">
                        <p>Billing address:</p>
                        <p className="ml-2">
                          {cardDate.billingAddress
                            ? typeof cardDate.billingAddress == "string"
                              ? cardDate.billingAddress
                              : cardDate.billingAddress?.billing_address1
                              ? cardDate.billingAddress.billing_address1
                              : "..."
                            : ".."}
                        </p>
                      </div>
                      <div className="flex font-Quiet_sans pb-3">
                        <p>City:</p>
                        <p className="ml-2">-</p>
                      </div>
                      <div className="flex font-Quiet_sans pb-3">
                        <p>Zipcode:</p>
                        <p className="ml-2">-</p>
                      </div>

                      <div className="flex justify-center">
                        <span
                          onClick={() => {
                            dispatch(showResetPinModal());
                          }}
                          className="px-3 py-2 rounded-xl cursor-pointer font-Quiet_sans text-[#8991A0] border-[#8991A0] border"
                        >
                          Reset card pin
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={17} className="pl-4 ">
                  <div className="border border-[#ffffff33] mt-2 rounded-xl min-h-[570px]">
                    <Row>
                      <Col xs={12}>
                        <div className="flex items-center p-6 border-b border-[#ffffff33]">
                          <div>
                            <Image src={money_in} alt="" />
                          </div>
                          <div className="text-[#9AA1AE] font-Quiet_sans ml-3 ">
                            <p className="font-Quiet_sans text-[#9AA1AE] mb-1 ">
                              Money in
                            </p>
                            <p className="text-2xl">
                              {(cardDate.currency
                                ? cardDate.currency
                                : "NGN ") +
                                (moneyFlow.inflow ? moneyFlow.inflow.toLocaleString() : " 0")}
                            </p>
                          </div>
                        </div>
                      </Col>

                      <Col xs={12} className="border-l border-[#ffffff33]">
                        <div className="flex items-center p-6 border-b border-[#ffffff33]">
                          <div>
                            <Image src={money_out} alt="" />
                          </div>
                          <div className="text-[#9AA1AE] font-Quiet_sans ml-3 ">
                            <p className="font-Quiet_sans text-[#9AA1AE] mb-1 ">
                              Money out
                            </p>
                            <p className="text-2xl">
                              {(cardDate.currency
                                ? " " + cardDate.currency
                                : "NGN ") +
                                (moneyFlow.outflow
                                  ? " " + moneyFlow.outflow.toLocaleString()
                                  : " 0")}
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24}>
                        <div className="font-Quiet_sans text-[#9AA1AE] px-4 py-4">
                          <p>Card transaction statistics</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <TableWrapper>
                {isLoading ? (
                  <TableLoading />
                ) : (
                  <>
                    <div>
                      <CardDetailsNav
                        handleSearchValue={setQuery}
                        handleEndDate={setEndDate}
                        handleStartDate={setStartDate}
                      />
                    </div>
                    <div>
                      <CardDetailsHeader />
                    </div>
                    {transactionError ? (
                      <ErrorState text="Oops Error Occured" />
                    ) : cardTransactions.length < 1 ? (
                      <TableEmptyState text="No transactions found" />
                    ) : (
                      <>
                        <div>
                          {cardTransactions.length > 0
                            ? cardTransactions.map((item, index) => {
                                return (
                                  <CardDetailsData
                                    date={item.date}
                                    type={item.type}
                                    category={item.category}
                                    currency={
                                      cardDate.currency
                                        ? cardDate.currency
                                        : "NGN"
                                    }
                                    amount={item.amount.toLocaleString()}
                                    description={item.description}
                                    transactionReference={
                                      item.transactionReference
                                    }
                                    newBalance={item.newBalance.toLocaleString()}
                                    key={index}
                                  />
                                );
                              })
                            : ""}
                        </div>

                        {paginationsShown.length ? (
                          <div className="flex justify-center py-8">
                            {paginationValues[0] !== currentPagination &&
                              paginationValues.indexOf(currentPagination) >
                                1 && (
                                <div
                                  className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
                                  onClick={() => {
                                    setCurrentPagination(1);
                                    setPaginationClicked(true);
                                  }}
                                >
                                  <Image
                                    src={paginateFirst}
                                    alt=""
                                    width={24}
                                    height={24}
                                  />
                                </div>
                              )}

                            {paginationValues[0] !== currentPagination && (
                              <div
                                className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
                                onClick={() => {
                                  setPaginationClicked(true);
                                  setCurrentPagination(currentPagination - 1);
                                }}
                              >
                                <Image
                                  src={paginatePrevious}
                                  alt=""
                                  width={24}
                                  height={24}
                                />
                              </div>
                            )}

                            {/* The remain with words */}
                            {paginationsShown.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  onClick={() => {
                                    if (item === "...") {
                                      return;
                                    }
                                    setPaginationClicked(true);
                                    setCurrentPagination(+item);
                                  }}
                                  className={`p-4 ${
                                    currentPagination == item
                                      ? "bg-[#B0B7CA] text-[#111827]"
                                      : "bg-[#111827] text-[#B0B7CA] "
                                  } px-6 cursor-pointer rounded-xl mr-2 font-Quiet_sans  font-xl `}
                                >
                                  {item}
                                </div>
                              );
                            })}

                            {paginationValues[paginationValues.length - 1] !==
                              currentPagination && (
                              <div
                                onClick={() => {
                                  setCurrentPagination(currentPagination + 1);
                                  setPaginationClicked(true);
                                }}
                                className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
                              >
                                <Image
                                  src={paginateNext}
                                  alt=""
                                  width={24}
                                  height={24}
                                />
                              </div>
                            )}

                            {paginationValues[paginationValues.length - 1] !==
                              currentPagination &&
                              checkForSlice() && (
                                <div
                                  className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
                                  onClick={() => {
                                    setCurrentPagination(
                                      paginationValues[
                                        paginationValues.length - 1
                                      ]
                                    );
                                    setPaginationClicked(true);
                                  }}
                                >
                                  <Image
                                    src={paginateLast}
                                    alt=""
                                    width={24}
                                    height={24}
                                  />
                                </div>
                              )}
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </>
                )}
              </TableWrapper>
            </div>
          </div>
        </main>
      </main>
    </div>
  );
}

export default CardDetails;
