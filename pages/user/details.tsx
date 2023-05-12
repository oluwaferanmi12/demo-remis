import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { SideNav } from "@/components/Nav/SideNav";
import { Navbar } from "@/components/Nav/Navbar";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { apiCall } from "@/apiClient/api";
import { BoxWrapper } from "@/components/Wrapper/BoxWrapper";
import { DetailsDashboard } from "@/components/Text/DetailsDashboard";
import { Row, Col } from "antd";
import wallet from "../../public/ICONS/SVG/wallet-icon-big.svg";
import money_in from "../../public/ICONS/SVG/money-in.svg";
import money_out from "../../public/ICONS/SVG/money-out.svg";
import kyc from "../../public/ICONS/SVG/kyc.svg";
import transfer_limit from "../../public/ICONS/SVG/money-limit.svg";
import { MoneyFlow } from "@/components/Text/MoneyFlow";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/reducers/user";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { DetailsTableHeader } from "@/components/Table/DetailsTableHeader";
import { DetailsTableData } from "@/components/Table/DetailsTableData";
import { showKycModal } from "@/store/reducers/handleKycModal";
import { RootState } from "@/store/store";
import { KycModal } from "@/components/Modals/KycModal";
import { showLimitModal } from "@/store/reducers/handleLimitModal";
import { SetLimitModal } from "@/components/Modals/SetLimitModal";
import { TableEmptyState } from "@/components/States/TableEmptyState";
import { logOutUser } from "@/utils/logOutUser";
import paginateFirst from "../../public/ICONS/SVG/paginateFirst.svg";
import paginateLast from "../../public/ICONS/SVG/paginateLast.svg";
import paginatePrevious from "../../public/ICONS/SVG/paginatePrevious.svg";
import paginateNext from "../../public/ICONS/SVG/paginateNext.svg";
import Image from "next/image";
import { UserDetailsTableNav } from "@/components/Nav/UserDetailsTableNav";
import { LoadingState } from "@/components/States/LoadingState";
import { SmallLoadingState } from "@/components/States/SmallLoadingState";
import { TableLoading } from "@/components/States/TableLoading";
import notFound from "@/public/ICONS/SVG/txnNotFound.svg";
import phone from "@/public/ICONS/SVG/new-phone.svg";
import location from "@/public/ICONS/SVG/new-location.svg";

function Details() {
  interface User {
    lastName: "";
    firstName: "";
    walletBalance: "";
    lockedOut: boolean;
    email: string;
    phoneNumber: string;
    location: string;
  }

  interface WalletDetails {
    inflow: string;
    outflow: string;
    id: string;
  }

  interface WalletTransactions {
    id: string;
    newBalance: string;
    amount: string;
    status: string;
    channel: string;
    category: string;
    transactionReference: string;
    date: string;
    description: string;
  }

  interface Wallet {
    dailyLimit: string;
    id: string;
    balance: string;
    target: string;
    suspended: boolean;
    currency: string;
  }

  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<User>({
    firstName: "",
    lastName: "",
    walletBalance: "",
    lockedOut: false,
    email: "",
    location: "",
    phoneNumber: "",
  });
  const [walletTransactionDetails, setWalletTransactionDetails] = useState<
    WalletTransactions[]
  >([]);
  const [walletDetails, setWalletDetails] = useState<WalletDetails>({
    inflow: "",
    outflow: "",
    id: "",
  });
  const [paginationClicked, setPaginationClicked] = useState(false);
  const [overallCheckClicked, setOverallCheckClicked] = useState(false);
  const [checkedArray, setCheckedArray] = useState<string[]>([]);
  const [removeOne, setRemoveOne] = useState(false);
  const [userDetailsLoading, setUserDetailsLoading] = useState(true);
  const [queryValue, setQueryValue] = useState("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [profiles, setProfiles] = useState<string[]>([]);
  const [activeProfile, setActiveProfile] = useState("");
  const [suspendAccount, setSuspendAccount] = useState(false);
  const [showKycTrigger, setShowKycTrigger] = useState(false);
  const [kycDetails, setKycDetails] = useState({
    status: "",
    kycIdentity: {
      identityType: 0,
      identityNumber: "",
      bvn: "",
      idDocument: { fullUrl: "" },
      doc2Compare: { fullUrl: "" },
    },
  });
  const { kycModalActive } = useSelector(
    (state: RootState) => state.kycReducer
  );
  const { limitModalActive } = useSelector(
    (state: RootState) => state.limitReducer
  );
  const [currentWallet, setCurrentWallet] = useState<Wallet>({
    dailyLimit: "",
    id: "",
    balance: "",
    target: "",
    suspended: false,
    currency: "",
  });
  const [paginationValues, setPaginationValues] = useState<number[]>([]);
  const [currentPagination, setCurrentPagination] = useState(0);
  const [paginationsShown, setPaginationsShown] = useState<(number | string)[]>(
    []
  );
  const pageMounted = useRef(false);
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [endDate, setEndDate] = useState("");
  const [tableLoading, setTableLoading] = useState(true);
  const [personalIndex, setPersonalIndex] = useState<number>();
  const [staffIndex, setStaffIndex] = useState<number>();

  useEffect(() => {
    if (paginationClicked) {
      apiCall(
        "get",
        `Wallet/Transactions/${
          activeProfile === "Personal"
            ? wallets[
                wallets.findIndex((item, index) => item.target == "Personal")
              ].id
            : wallets[
                wallets.findIndex((item, index) => item.target == "Staff")
              ].id
        }?Query=${queryValue}&Page=${currentPagination}&PageLimit=${10}`
      )
        .then((res) => {
          const { pagination, data } = res?.data;
          const { transactions } = data;
          const { totalData, currentPage, totalPages } = pagination;
          setCurrentPagination(currentPage);
          setWalletTransactionDetails(transactions);
          setWalletDetails(res?.data.data);
          const paginationArray = [];
          for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(i);
          }
          setPaginationValues(paginationArray);
          sortCurrentPagination(paginationArray, currentPage, totalPages);
        })
        .catch((e) => {
          if (e.response?.status === 401) {
            dispatch(logoutUser());
            logOutUser();
            router.push("/admin/sign-in");
          }
        })
        .finally(() => {
          setPaginationClicked(false);
        });
    }
  }, [paginationClicked]);

  useEffect(() => {
    // The problem with this is that if there is no wallet found here , none of the dependencies will trigger this.
    if (wallets.length) {
      apiCall(
        "get",
        `Wallet/Transactions/${
          activeProfile === "Personal"
            ? wallets[
                wallets.findIndex((item, index) => item.target == "Personal")
              ]?.id
            : wallets[
                wallets.findIndex((item, index) => item.target == "Staff")
              ]?.id
        }?Query=${queryValue}&PageLimit=${10}&Page=${1}&StartDate=${date}&EndDate=${endDate}`
      )
        .then((res) => {
          const { pagination, data } = res?.data;
          const { transactions } = data;
          const { totalData, currentPage, totalPages } = pagination;
          setWalletTransactionDetails(transactions);
          setWalletDetails(res?.data.data);
          setCurrentPagination(1);
          const paginationArray = [];
          for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(i);
          }
          setPaginationValues(paginationArray);
          sortCurrentPagination(paginationArray, currentPage, totalPages);
        })
        .catch((e) => {
          if (e.response?.status === 401) {
            dispatch(logoutUser());
            logOutUser();
            router.push("/admin/sign-in");
          }
        })
        .finally(() => {
          setTableLoading(false);
        });
    }
  }, [activeProfile, queryValue, date, endDate]);

  useEffect(() => {
    if (pageMounted.current) {
      let fillArray = [];
      if (removeOne) {
        // Now , this is triggered when the overall is not exactly clicked but then the whole content is marked, but one of it is unchecked , this would automatically remove the check sign on the original but still retain the values in the array that saves the checked items
        setRemoveOne(false);
      } else {
        if (checkedArray.length && !overallCheckClicked) {
          // This would work when the overall click is set to be inactive, meaning the whole array is basically reset to the beginning
          setCheckedArray([]);
          return;
        }
        // Now , if the overall is clicked , it doesn't matter if something is inside it would automatically fill it will the required data , basically when the overall is true
        fillArray = walletTransactionDetails.map((item) => item.id);
        setCheckedArray(fillArray);
      }
    }
  }, [overallCheckClicked]);

  useEffect(() => {
    let query = new URLSearchParams(window.location.search);
    let urlQuery = query.get("q");

    // Make the first call to get the User Details'

    apiCall("get", `Admin/UserProfile?userId=${urlQuery}`)
      .then((res) => {
        const { userDetails, profiles, wallets } = res?.data.data;

        if (wallets.length) {
          if (wallet.length >= 2) {
            const pIndex = wallets.findIndex(
              (item: { target: string }, index: number) => {
                return item.target == "Personal";
              }
            );
            setPersonalIndex(pIndex);

            const sIndex = wallets.findIndex(
              (item: { target: string }, index: number) => {
                return item.target == "Staff";
              }
            );
            setStaffIndex(sIndex);
          }
        }
        setUserDetails(userDetails);
        setSuspendAccount(userDetails.lockedOut);
        setActiveProfile(wallets[0].target);
        setCurrentWallet(wallets[0]);
        setWallets(wallets);
        setProfiles(profiles);

        // Make the second Api Call
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          dispatch(logoutUser());
          logOutUser();
          router.push("/admin/sign-in");
        }
      })
      .finally(() => {
        pageMounted.current = true;
        setIsLoading(false);
        setUserDetailsLoading(false);
      });

    apiCall("get", `Admin/Kyc/Status?userid=${urlQuery}`)
      .then((res) => {
        setShowKycTrigger(true);
        setKycDetails(res?.data.data);
      })
      .catch((e) => {
        setShowKycTrigger(false);
        if (e.response?.status === 401) {
          dispatch(logoutUser());
          logOutUser();
          router.push("/admin/sign-in");
        }
      });
  }, []);

  const handleSuspendAccount = () => {
    if (suspendAccount) {
      // if account is suspended , then what we want to do is to basically unsuspend the account
      setUserDetails((prev) => {
        return { ...prev, lockedOut: false };
      });
      apiCall("post", `Admin/UnBlockUser/${userDetails.email}`)
        .then((res) => {
          setUserDetails((prev) => {
            return { ...prev, lockedOut: false };
          });
          setSuspendAccount(false);
        })
        .catch((e) => {
          setUserDetails((prev) => {
            return { ...prev, lockedOut: true };
          });
          setSuspendAccount(false);
          if (e.response?.status == 400) {
            return;
          }
          if (e.response?.status === 401) {
            dispatch(logoutUser());
            logOutUser();
            router.push("/admin/sign-in");
          }
        });
    } else {
      setUserDetails((prev) => {
        return { ...prev, lockedOut: true };
      });
      apiCall("post", `Admin/BlockUser/${userDetails.email}`)
        .then((res) => {
          setSuspendAccount(true);
          setUserDetails((prev) => {
            return { ...prev, lockedOut: true };
          });
        })
        .catch((e) => {
          setSuspendAccount(false);
          setUserDetails((prev) => {
            return { ...prev, lockedOut: false };
          });
          if (e.response?.status == 400) {
            return;
          }
          if (e.response?.status === 401) {
            dispatch(logoutUser());
            logOutUser();
            router.push("/admin/sign-in");
          }
        });
    }
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

  const modifyWallet = (walletId: string, amount: number) => {
    if (wallets.length) {
      const obtainIndex = wallets.findIndex((item, index) => {
        return item.id === walletId;
      });

      const walletInstance = wallets;

      walletInstance[obtainIndex].dailyLimit = amount.toString();
      setWallets([...walletInstance]);
    }
  };

  const handleFreezeAccount = () => {
    if (currentWallet.suspended) {
      currentWallet.suspended = false;
      setCurrentWallet({ ...currentWallet });
      apiCall("put", `Admin/UnFreezeWallet?walletId=${currentWallet.id}`)
        .then((res) => {
          currentWallet.suspended = false;
          setCurrentWallet({ ...currentWallet });
        })
        .catch((e) => {
          currentWallet.suspended = true;
          setCurrentWallet({ ...currentWallet });
        });
    } else {
      currentWallet.suspended = true;
      setCurrentWallet({ ...currentWallet });
      apiCall("put", `Admin/FreezeWallet?walletId=${currentWallet.id}`)
        .then((res) => {
          currentWallet.suspended = true;
          setCurrentWallet({ ...currentWallet });
        })
        .catch((e) => {
          currentWallet.suspended = false;
          setCurrentWallet({ ...currentWallet });
        });
    }
  };

  return (
    <>
      <Head>
        <title>User Details</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>

      <main className="flex">
        <SideNav />

        {kycModalActive && <KycModal kycDetails={kycDetails} />}
        {limitModalActive && (
          <SetLimitModal
            modifyWallet={modifyWallet}
            activeWallet={currentWallet}
            handleActiveWallet={setCurrentWallet}
            name={userDetails.firstName + " " + userDetails.lastName}
            walletId={currentWallet?.id}
            limitAmount={currentWallet?.dailyLimit}
          />
        )}

        <section className={styles.dashboardMainWrapper}>
          <div>
            <Navbar />
          </div>

          <div className="pr-8 pt-3 mb-4">
            {userDetailsLoading ? (
              <SmallLoadingState />
            ) : (
              <DetailsDashboard
                name={userDetails.firstName + " " + userDetails.lastName}
              />
            )}
          </div>
          {isLoading ? (
            <SmallLoadingState />
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex">
                {profiles.length ? (
                  profiles.map((item, index, root) => {
                    return (
                      <div
                        className="flex font-Quiet_sans text-[#D9DBE0] mb-8 "
                        key={index}
                      >
                        <p
                          onClick={() => {
                            if (wallets.length > 1) {
                              if (activeProfile === "Personal") {
                                const extractIndex = wallets.findIndex(
                                  (item, index) => {
                                    return item.target == "Staff";
                                  }
                                );

                                setCurrentWallet(wallets[extractIndex]);
                                setActiveProfile(wallets[extractIndex].target);
                              } else {
                                // Get the index of the current wallet in the wallets and then recalibrate as needed
                                const extractIndex = wallets.findIndex(
                                  (item, index) => {
                                    return item.target == "Personal";
                                  }
                                );

                                setCurrentWallet(wallets[extractIndex]);
                                setActiveProfile(wallets[extractIndex].target);
                              }
                            }
                          }}
                          className={`mr-5 cursor-pointer ${
                            activeProfile == item &&
                            "border-[#D9DBE0]  border-b-2 "
                          }  py-3`}
                        >
                          {item} Account
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-2 text-[#8991A0] ">No wallet found</div>
                )}
              </div>
              <div className="px-4 py-6 min-h-[100px] flex items-center justify-between">
                <div className="flex font-Quiet_sans">
                  <p
                    className={` cursor-pointer ${
                      userDetails.lockedOut
                        ? "bg-[#8DCEA0] text-[#089430]"
                        : "bg-[#F3BFBF] text-[#D72F2F]"
                    } px-8 py-3 rounded-md mr-4`}
                    onClick={() => {
                      handleSuspendAccount();
                    }}
                  >
                    {userDetails.lockedOut ? "Unblock" : "Suspend"}
                  </p>
                  <p className="text-[#8991A0] cursor-pointer bg-transparent border border-[#8991A0] px-8 py-3 rounded-md mr-4">
                    Suspend on inflow
                  </p>
                  <p
                    className={` cursor-pointer bg-transparent border  px-8 py-3 rounded-md mr-4 ${
                      currentWallet.suspended
                        ? "border-[#089430] text-[#089430]"
                        : "border-[#d72f2f] text-[#d72f2f]"
                    }`}
                    onClick={() => {
                      handleFreezeAccount();
                    }}
                  >
                    {currentWallet.suspended
                      ? "Unfreeze wallet"
                      : "Freeze wallet"}
                  </p>
                  <p className="text-[#8991A0] cursor-pointer bg-transparent border border-[#8991A0] px-8 py-3 rounded-md mr-4">
                    Flank
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="pr-8">
            <div>
              <p className="text-[#9299A8] font-Quiet_sans mb-2">
                Account details
              </p>
            </div>
            <BoxWrapper>
              <Row gutter={{ lg: 20, xs: 0 }}>
                {/* <Col xs={24} className="border-b border-[#54648D]">
                  <div className="px-4 py-6 min-h-[100px] flex items-center justify-between">
                    <div className="">
                      <MoneyFlow
                        imgUrl={wallet}
                        title="Account balance"
                        amount={
                          currentWallet.currency
                            ? currentWallet.currency +
                              " " +
                              currentWallet?.balance
                            : "NGN 0"
                        }
                      />
                    </div>

                    <div className="flex font-Quiet_sans">
                      <p
                        className={` cursor-pointer ${
                          userDetails.lockedOut
                            ? "bg-[#8DCEA0] text-[#089430]"
                            : "bg-[#F3BFBF] text-[#D72F2F]"
                        } px-8 py-3 rounded-md mr-4`}
                        onClick={() => {
                          handleSuspendAccount();
                        }}
                      >
                        {userDetails.lockedOut ? "Unblock" : "Suspend"}
                      </p>
                      <p className="text-[#8991A0] cursor-pointer bg-transparent border border-[#8991A0] px-8 py-3 rounded-md mr-4">
                        Suspend on inflow
                      </p>
                      <p
                        className={` cursor-pointer bg-transparent border  px-8 py-3 rounded-md mr-4 ${
                          currentWallet.suspended
                            ? "border-[#089430] text-[#089430]"
                            : "border-[#d72f2f] text-[#d72f2f]"
                        }`}
                        onClick={() => {
                          handleFreezeAccount();
                        }}
                      >
                        {currentWallet.suspended
                          ? "Unfreeze wallet"
                          : "Freeze wallet"}
                      </p>
                      <p className="text-[#8991A0] cursor-pointer bg-transparent border border-[#8991A0] px-8 py-3 rounded-md mr-4">
                        Flank
                      </p>
                    </div>
                  </div>
                </Col> */}

                <Col xs={24}>
                  <Row>
                    <Col xs={6}>
                      <div className="px-4 border-r py-8 border-[#54648D]">
                        <MoneyFlow
                          imgUrl={wallet}
                          textSmall={true}
                          title="Account balance"
                          amount={
                            currentWallet.currency
                              ? currentWallet.currency +
                                " " +
                                currentWallet?.balance.toLocaleString()
                              : "NGN 0"
                          }
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="px-4 border-r py-8 border-[#54648D]">
                        <MoneyFlow
                          imgUrl={money_out}
                          amount={
                            walletDetails.outflow
                              ? currentWallet.currency +
                                " " +
                                walletDetails.outflow.toLocaleString()
                              : currentWallet.currency
                              ? currentWallet.currency + " 0"
                              : "NGN 0"
                          }
                          title="Money out"
                          textSmall={true}
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="px-4 border-r py-8 border-[#54648D]">
                        <MoneyFlow
                          imgUrl={money_in}
                          amount={
                            walletDetails.inflow
                              ? currentWallet.currency +
                                " " +
                                walletDetails.inflow.toLocaleString()
                              : currentWallet.currency
                              ? currentWallet.currency + " 0"
                              : "NGN " + "0"
                          }
                          title="Money in"
                          textSmall={true}
                        />
                      </div>
                    </Col>

                    <Col xs={6}>
                      <div className="px-2 flex justify-between  items-start py-8">
                        <div>
                          <MoneyFlow
                            imgUrl={transfer_limit}
                            amount={
                              currentWallet?.dailyLimit
                                ? currentWallet.currency +
                                  " " +
                                  currentWallet?.dailyLimit.toLocaleString()
                                : "No limit set"
                            }
                            title="Daily transfer limit"
                            textSmall={true}
                            removeLeftMargin={true}
                          />
                        </div>

                        <div
                          onClick={() => {
                            dispatch(showLimitModal());
                          }}
                          className="font-Quiet_sans text-[#E5E7EB] border px-3 border-[#E5E7EB]   py-1 rounded-lg  cursor-pointer"
                        >
                          Set limit
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </BoxWrapper>
            <div>
              <p className="text-[#9299A8] font-Quiet_sans mt-5 mb-2">
                Personal details
              </p>
            </div>
            <BoxWrapper>
              <Row gutter={{ lg: 20, xs: 0 }}>
                {/* <Col xs={24} className="border-b border-[#54648D]">
                  <div className="px-4 py-6 min-h-[100px] flex items-center justify-between">
                    <div className="">
                      <MoneyFlow
                        imgUrl={wallet}
                        title="Account balance"
                        amount={
                          currentWallet.currency
                            ? currentWallet.currency +
                              " " +
                              currentWallet?.balance
                            : "NGN 0"
                        }
                      />
                    </div>

                    <div className="flex font-Quiet_sans">
                      <p
                        className={` cursor-pointer ${
                          userDetails.lockedOut
                            ? "bg-[#8DCEA0] text-[#089430]"
                            : "bg-[#F3BFBF] text-[#D72F2F]"
                        } px-8 py-3 rounded-md mr-4`}
                        onClick={() => {
                          handleSuspendAccount();
                        }}
                      >
                        {userDetails.lockedOut ? "Unblock" : "Suspend"}
                      </p>
                      <p className="text-[#8991A0] cursor-pointer bg-transparent border border-[#8991A0] px-8 py-3 rounded-md mr-4">
                        Suspend on inflow
                      </p>
                      <p
                        className={` cursor-pointer bg-transparent border  px-8 py-3 rounded-md mr-4 ${
                          currentWallet.suspended
                            ? "border-[#089430] text-[#089430]"
                            : "border-[#d72f2f] text-[#d72f2f]"
                        }`}
                        onClick={() => {
                          handleFreezeAccount();
                        }}
                      >
                        {currentWallet.suspended
                          ? "Unfreeze wallet"
                          : "Freeze wallet"}
                      </p>
                      <p className="text-[#8991A0] cursor-pointer bg-transparent border border-[#8991A0] px-8 py-3 rounded-md mr-4">
                        Flank
                      </p>
                    </div>
                  </div>
                </Col> */}

                <Col xs={24}>
                  <Row>
                    <Col xs={8}>
                      <div className="px-4 border-r py-8 border-[#54648D]">
                        <MoneyFlow
                          imgUrl={phone}
                          amount={
                            userDetails.phoneNumber
                              ? userDetails.phoneNumber
                              : "-"
                          }
                          title="Phone Number"
                          textSmall={true}
                        />
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className="px-4 border-r py-8 border-[#54648D]">
                        <MoneyFlow
                          imgUrl={location}
                          amount={
                            userDetails.location ? userDetails.location : "-"
                          }
                          title="Contact address"
                          textSmall={true}
                        />
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className="px-2 flex items-start justify-between py-6 border-[#54648D]">
                        <div>
                          <MoneyFlow
                            imgUrl={kyc}
                            amount={
                              kycDetails.status == "BVNVerified"
                                ? "Tier 1"
                                : kycDetails.status == "PhoneVerified"
                                ? "Tier 2"
                                : kycDetails.status == "Verified"
                                ? "Tier 3"
                                : "No Tier"
                            }
                            title="KYClevel"
                          />
                        </div>
                        {showKycTrigger && (
                          <div
                            className="font-Quiet_sans text-[#E5E7EB] border border-[#E5E7EB]  px-3 py-1 rounded-lg cursor-pointer"
                            onClick={() => {
                              dispatch(showKycModal());
                            }}
                          >
                            view kyc
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </BoxWrapper>

            <TableWrapper>
              <UserDetailsTableNav
                handleDate={setDate}
                headerText="Transaction history"
                handleSearchValue={setQueryValue}
                currentSearchValue={queryValue}
                handleEndDate={setEndDate}
              />
              <div>
                <DetailsTableHeader />
              </div>
              {tableLoading ? (
                <TableLoading />
              ) : (
                <>
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
                              description={item.description}
                              amount={item.amount.toLocaleString()}
                              channel={item.channel}
                              date={item.date}
                              transactionReference={item.transactionReference}
                              count={index}
                              currency={currentWallet.currency}
                              status={item.status}
                              category={item.category}
                              newBalance={item.newBalance.toLocaleString()}
                            />
                          </div>
                        );
                      })
                    )}
                  </div>

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
                </>
              )}
            </TableWrapper>
          </div>
        </section>
      </main>
    </>
  );
}

export default Details;
