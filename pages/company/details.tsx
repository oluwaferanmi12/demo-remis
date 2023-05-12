import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { SideNav } from "@/components/Nav/SideNav";
import styles from "../../styles/Home.module.css";
import { Navbar } from "@/components/Nav/Navbar";
import { DetailsDashboard } from "@/components/Text/DetailsDashboard";
import { Col, Row } from "antd";
import { BoxWrapper } from "@/components/Wrapper/BoxWrapper";
import { DangerButton } from "@/components/Buttons/Buttons";
import wallet from "../../public/ICONS/SVG/wallet-icon-big.svg";
import { MoneyFlow } from "@/components/Text/MoneyFlow";
import money_in from "../../public/ICONS/SVG/money-in.svg";
import money_out from "../../public/ICONS/SVG/money-out.svg";
import kyc from "../../public/ICONS/SVG/kyc.svg";
import transfer_limit from "../../public/ICONS/SVG/money-limit.svg";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { TableNav } from "@/components/Nav/TableNav";
import { DetailsTableHeader } from "@/components/Table/DetailsTableHeader";
import { apiCall } from "@/apiClient/api";
import { useRouter } from "next/router";
import { DetailsTableData } from "@/components/Table/DetailsTableData";
import { handleModalActive } from "@/store/reducers/handleNoOfStaff";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SetNoOfStaff } from "@/components/Modals/SetNoOfStaff";
import { SetLimitModal } from "@/components/Modals/SetLimitModal";
import { showLimitModal } from "@/store/reducers/handleLimitModal";
import { savePage } from "@/store/reducers/currentPage";
import paginateFirst from "../../public/ICONS/SVG/paginateFirst.svg";
import paginateLast from "../../public/ICONS/SVG/paginateLast.svg";
import paginatePrevious from "../../public/ICONS/SVG/paginatePrevious.svg";
import paginateNext from "../../public/ICONS/SVG/paginateNext.svg";
import Image from "next/image";
import { logOutUser } from "@/utils/logOutUser";
import { CompanyDetailsNav } from "@/components/Nav/CompanyDetailNav";
import { TableEmptyState } from "@/components/States/TableEmptyState";
import notFound from "@/public/ICONS/SVG/txnNotFound.svg";
import { TableLoading } from "@/components/States/TableLoading";

function Details() {
  interface Wallet {
    id: string;
    newBalance: string;
    amount: string;
    status: string;
    channel: string;
    category: string;
    date: string;
    transactionReference: string;
    description: string;
  }

  interface WalletDetailsProps {
    id: string;
    balance: string;
    currency: string;
    dailyLimit: string;
    target: string;
    suspended: boolean;
  }

  interface WalletData {
    inflow: string;
    outflow: string;
  }

  interface User {
    name: string;
    email: "";
  }
  const router = useRouter();
  const dispatch = useDispatch();
  const { noOfStaffModalActive } = useSelector(
    (state: RootState) => state.noOfStaffReducer
  );
  const { limitModalActive } = useSelector(
    (state: RootState) => state.limitReducer
  );

  const [overallCheckClicked, setOverallCheckClicked] = useState(false);
  const [userDetails, setUserDetails] = useState<User>({ name: "", email: "" });
  const [tableLoading, setTableLoading] = useState(false);
  const [noOfStaffs, setNoOfStaffs] = useState(0);
  const [walletData, setWalletData] = useState<WalletData>({
    inflow: "",
    outflow: "",
  });
  const [walletObject, setWalletObject] = useState({
    dailyLimit: "",
    id: "",
    balance: "",
    target: "",
    currency: "",
    suspended: false,
  });
  const [walletTransactionDetails, setWalletTransactionDetails] = useState<
    Wallet[]
  >([]);
  const [paginationClicked, setPaginationClicked] = useState(false);

  const [paginationValues, setPaginationValues] = useState<number[]>([]);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [paginationsShown, setPaginationsShown] = useState<(number | string)[]>(
    []
  );
  const [eDate, setEDate] = useState("");
  const [walletDetails, setWalletDetails] = useState<WalletDetailsProps>({
    id: "",
    balance: "",
    currency: "",
    dailyLimit: "",
    suspended: false,
    target: "",
  });
  const [date, setDate] = useState("");
  const [queryValue, setQueryValue] = useState("");

  const pageMounted = useRef(false);

  useEffect(() => {
    if (pageMounted.current) {
      const getQuery = new URLSearchParams(window.location.search);
      const query = getQuery.get("q");
      apiCall(
        "get",
        `Admin/Customer/WalletTransactions/${query}?Query=${queryValue}&Page=${1}&PageLimit=${10}&StartDate=${date}&EndDate=${eDate}`
      )
        .then((res) => {
          const { currentPage, totalData, totalPages, currentPageData } =
            res?.data.pagination;
          setWalletData(res?.data.data);
          setCurrentPagination(1);
          const paginationArray = [];
          for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(i);
          }
          setPaginationValues(paginationArray);
          sortCurrentPagination(paginationArray, currentPage, totalPages);
          setWalletTransactionDetails(res?.data.data.transactions);
        })
        .catch((e) => {
          if (e.response?.status === 401) {
            logOutUser();
            router.push("/admin/sign-in");
          }
        });
    }
  }, [queryValue, date, eDate]);

  useEffect(() => {
    dispatch(savePage("company"));
    return () => {};
  }, []);

  useEffect(() => {
    setTableLoading(true);
    const getQuery = new URLSearchParams(window.location.search);
    const query = getQuery.get("q");
    Promise.all([
      apiCall(
        "get",
        `Admin/Customer/WalletTransactions/${query}?PageLimit=${10}`
      ),
      apiCall("get", `Admin/Companies/Find/${query}`),
      apiCall("get", `CompanyUser/All?count=true&companyId=${query}`),
      apiCall("get", `/Admin/Customer/Wallet/${query}`),
    ])
      .then(([res_1, res_2, res_3, res_4]) => {
        setWalletData(res_1?.data.data);
        setNoOfStaffs(res_3?.data);
        setWalletDetails(res_4?.data.data);
        setCurrentPagination(1);
        const { currentPage, totalData, totalPages, currentPageData } =
          res_1?.data.pagination;
        setCurrentPagination(1);
        const paginationArray = [];
        for (let i = 1; i <= totalPages; i++) {
          paginationArray.push(i);
        }
        setPaginationValues(paginationArray);
        sortCurrentPagination(paginationArray, currentPage, totalPages);
        setWalletTransactionDetails(res_1?.data.data.transactions);
        setUserDetails(res_2?.data.data);
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          logOutUser();
          router.push("/admin/sign-in");
        }
      })
      .finally(() => {
        pageMounted.current = true;
        setTableLoading(false);
      });
  }, []);

  useEffect(() => {
    const getQuery = new URLSearchParams(window.location.search);
    const query = getQuery.get("q");
    if (paginationClicked) {
      apiCall(
        "get",
        `Admin/Customer/WalletTransactions/${query}?Query=${queryValue}&Page=${currentPagination}&PageLimit=${10}`
      )
        .then((res) => {
          const { currentPage, totalData, totalPages, currentPageData } =
            res?.data.pagination;
          setCurrentPagination(currentPage);
          const paginationArray = [];
          for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(i);
          }
          setPaginationValues(paginationArray);
          sortCurrentPagination(paginationArray, currentPage, totalPages);
          setWalletTransactionDetails(res?.data.data.transactions);
        })
        .catch((e) => {
          if (e.response?.status === 401) {
            logOutUser();
            router.push("/admin/sign-in");
          }
        })
        .finally(() => {
          setPaginationClicked(false);
        });
    }
  }, [paginationClicked]);

  const modifyWallet = (walletId: string, amount: number) => {
    const newWalletValue = walletDetails;
    newWalletValue.dailyLimit = amount.toString();
    setWalletDetails({ ...newWalletValue });
  };

  const checkForSlice = (): boolean => {
    const rArray = paginationValues.slice(
      paginationValues.indexOf(currentPagination)
    );

    return rArray.length >= 3 ? true : false;
  };

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

  const handleFreezeWallet = () => {
    if (walletDetails.suspended) {
      walletDetails.suspended = false;
      setWalletDetails({ ...walletDetails });
      apiCall("put", `Admin/UnFreezeWallet?walletId=${walletDetails.id}`)
        .then((res) => {
          walletDetails.suspended = false;
          setWalletDetails({ ...walletDetails });
        })
        .catch((e) => {
          if (e.response?.status === 401) {
            logOutUser();
            router.push("/admin/sign-in");
          }
          walletDetails.suspended = true;
          setWalletDetails({ ...walletDetails });
        });
    } else {
      walletDetails.suspended = true;
      setWalletDetails({ ...walletDetails });
      apiCall("put", `Admin/FreezeWallet?walletId=${walletDetails.id}`)
        .then((res) => {
          walletDetails.suspended = true;
          setWalletDetails({ ...walletDetails });
        })
        .catch((e) => {
          if (e.response?.status === 401) {
            logOutUser();
            router.push("/admin/sign-in");
          }
          walletDetails.suspended = false;
          setWalletDetails({ ...walletDetails });
        });
    }
  };

  // const handleSuspendAccount = () => {
  //   apiCall("post" , `Admin/UnblockUser/${userDetails.email}`)
  // }

  return (
    <>
      <Head>
        <title>Company details</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>

      <main className="flex">
        <SideNav />

        {noOfStaffModalActive && <SetNoOfStaff />}
        {limitModalActive && (
          <SetLimitModal
            modifyWallet={modifyWallet}
            limitAmount={
              walletDetails.dailyLimit
                ? walletDetails.dailyLimit.toString()
                : ""
            }
            name={userDetails.name}
            walletId={walletDetails.id}
            activeWallet={walletObject}
            handleActiveWallet={setWalletDetails}
            type="company"
          />
        )}
        <section className={styles.dashboardMainWrapper}>
          <div>
            <Navbar />
          </div>
          <div className="pr-8 pt-3 mb-8">
            <DetailsDashboard
              name={userDetails?.name}
              subText="You can drill down to manage company account here"
            />
          </div>

          <div className="pr-8">
            <Row gutter={{ lg: 20, xs: 0 }}>
              <Col xs={7}>
                <BoxWrapper>
                  <div className="px-4 py-6 min-h-[220px]">
                    <div className="mb-16">
                      <MoneyFlow
                        imgUrl={wallet}
                        title="Account balance"
                        amount={
                          walletDetails.currency +
                          " " +
                          (walletDetails.balance
                            ? walletDetails.balance.toLocaleString()
                            : "0")
                        }
                      />
                    </div>

                    <div>
                      <Row gutter={{ lg: 20, xs: 0 }} className="mb-3">
                        <Col xs={12}>
                          <DangerButton text="Suspend" danger={false} />
                        </Col>
                        <Col xs={12}>
                          <p
                            className={` cursor-pointer bg-transparent border  px-8 py-3 rounded-md mr-4 text-center ${
                              walletDetails.suspended
                                ? "border-[#089430] text-[#089430]"
                                : "border-[#d72f2f] text-[#d72f2f]"
                            }`}
                            onClick={() => {
                              handleFreezeWallet();
                            }}
                          >
                            {walletDetails.suspended ? "Unfreeze" : "Freeze "}
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </BoxWrapper>
              </Col>

              <Col xs={17}>
                <BoxWrapper>
                  <Row className="flex">
                    <Col xs={12} className="py-6 ">
                      <div className="px-4">
                        <MoneyFlow
                          imgUrl={money_in}
                          amount={
                            walletDetails.currency +
                            " " +
                            (walletData?.inflow
                              ? walletData?.inflow.toLocaleString()
                              : "0")
                          }
                          title="Money in"
                        />
                      </div>

                      <hr className="my-7" />

                      <div className="px-4 flex items-center justify-between">
                        <div>
                          <MoneyFlow
                            imgUrl={kyc}
                            amount={noOfStaffs.toString()}
                            title="Number of staffs"
                          />
                        </div>

                        {/* <div
                          className="font-Quiet_sans text-[#E5E7EB] border border-[#E5E7EB] py-3 px-6 rounded-lg mr-4 cursor-pointer"
                          onClick={() => {
                            dispatch(handleModalActive());
                          }}
                        >
                          Set number of staffs
                        </div> */}
                      </div>
                    </Col>
                    <Col xs={12} className="border-l border-[#ACB2BD] py-6">
                      <div className="px-4">
                        <MoneyFlow
                          imgUrl={money_out}
                          amount={
                            walletDetails.currency +
                            " " +
                            (walletData?.outflow
                              ? walletData.outflow.toLocaleString()
                              : "0")
                          }
                          title="Money out"
                        />
                      </div>

                      <hr className="my-7" />

                      <div className="px-4 flex justify-between items-start">
                        <div>
                          <MoneyFlow
                            imgUrl={transfer_limit}
                            amount={
                              walletDetails.dailyLimit
                                ? walletDetails.dailyLimit.toString()
                                : "No Limit set"
                            }
                            title="Daily transfer limit"
                          />
                        </div>
                        <div
                          onClick={() => {
                            dispatch(showLimitModal());
                          }}
                          className="font-Quiet_sans text-[#E5E7EB] border border-[#E5E7EB]  px-2 rounded-lg mr-4 cursor-pointer"
                        >
                          Set limit
                        </div>
                      </div>
                    </Col>
                  </Row>
                </BoxWrapper>
              </Col>
            </Row>

            <TableWrapper>
              <CompanyDetailsNav
                handleSearchValue={setQueryValue}
                headerText="Transaction History"
                handleStartDate={setDate}
                handleEndDate={setEDate}
              />
              <div>
                <DetailsTableHeader />
              </div>

              {tableLoading ? (
                <TableLoading />
              ) : (
                <div>
                  {walletTransactionDetails.length == 0 ? (
                    <TableEmptyState
                      icon={notFound}
                      text="No transactions found"
                    />
                  ) : (
                    walletTransactionDetails.map((item, index) => {
                      return (
                        <div key={item.id}>
                          <DetailsTableData
                            newBalance={item.newBalance}
                            amount={item.amount}
                            channel={item.channel}
                            status={item.status}
                            count={index}
                            description={item.description}
                            category={item.category}
                            date={item.date}
                            transactionReference={item.transactionReference}
                            currency="NGN"
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {paginationsShown.length ? (
                <div className="flex justify-center py-8">
                  {paginationValues[0] !== currentPagination &&
                    paginationValues.indexOf(currentPagination) > 1 && (
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
                      <Image src={paginateNext} alt="" width={24} height={24} />
                    </div>
                  )}

                  {paginationValues[paginationValues.length - 1] !==
                    currentPagination &&
                    checkForSlice() && (
                      <div
                        className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
                        onClick={() => {
                          setCurrentPagination(
                            paginationValues[paginationValues.length - 1]
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
            </TableWrapper>
          </div>
        </section>
      </main>
    </>
  );
}

export default Details;
