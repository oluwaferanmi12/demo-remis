import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";
import { SideNavText } from "@/components/Text/SideNavText";
import { SideNav } from "@/components/Nav/SideNav";
import { Navbar } from "@/components/Nav/Navbar";
import { DashBoardHeader } from "@/components/Text/DashBoard";
import { BoxWrapper } from "@/components/Wrapper/BoxWrapper";
import users from "../public/ICONS/SVG/users.svg";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { TableNav } from "@/components/Nav/TableNav";
import { TableHeader } from "@/components/Table/TableHeader";
import { TableData } from "@/components/Table/TableData";
import { useEffect, useState, useCallback, useRef } from "react";
import { apiCall } from "@/apiClient/api";
import { logoutUser } from "@/store/reducers/user";
import { TableLoading } from "@/components/States/TableLoading";
import { TableEmptyState } from "@/components/States/TableEmptyState";
import paginateFirst from "../public/ICONS/SVG/paginateFirst.svg";
import paginateLast from "../public/ICONS/SVG/paginateLast.svg";
import paginatePrevious from "../public/ICONS/SVG/paginatePrevious.svg";
import paginateNext from "../public/ICONS/SVG/paginateNext.svg";
import { logOutUser } from "@/utils/logOutUser";
import { GetUserDetails } from "@/utils/GetUserDetails";
import currentPage, { savePage } from "@/store/reducers/currentPage";
import { PageHeaderLoader } from "@/components/States/PageHeaderLoader";
import { ErrorState } from "@/components/States/ErrorState";
import { setCurrentPagination } from "@/store/reducers/handleDateFilter";

export default function Home() {
  interface Customer {
    email: string;
    id: string;
    fullName: string;
    balance: string;
    isActive: boolean;
    firstName: string;
    lastName: string;
    lockedOut: boolean;
    dateRegistered: string;
  }

  const router = useRouter();
  // const { count } = useSelector((state: RootState) => state.userReducer);
  const previousTrigger = useRef("");
  const date_triggered = useRef(false);
  const {
    dateSet,
    query: queryValue,
    currentPagination,
    endDate,
  } = useSelector((state: RootState) => state.filterReducer);
  const pageMounted = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const [userPayload, setUserPayload] = useState();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalUser, setTotalUser] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paginationClicked, setPaginationClicked] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const [paginationValues, setPaginationValues] = useState<number[]>([]);
  const [paginationsShown, setPaginationsShown] = useState<(number | string)[]>(
    []
  );

  const [emailToSuspend, setEmailToSuspend] = useState("");
  const [suspendTriggered, setSuspendTriggered] = useState(false);
  const [unSuspendEmail, setUnSuspendEmail] = useState("");
  const [query, setQuery] = useState("");
  const [errorText, setErrorTexxt] = useState("");

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

  useEffect(() => {
    // Save the current page
    // set that the page is mounted

    if (pageMounted.current) {
      console.log("pageMounted");
      apiCall(
        "get",
        `Admin/AllUsers?Query=${queryValue}&Page=${currentPagination}&PageLimit=${10}&StartDate=${dateSet}`
      )
        .then((res) => {
          const { totalPages, currentPage, totalData } =
            res?.data.data.pagination;
          setTotalUser(totalData);
          dispatch(setCurrentPagination(currentPage));
          setCustomers(res?.data.data.users);

          const paginationArray = [];
          for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(i);
          }
          setPaginationValues(paginationArray);
          sortCurrentPagination(paginationArray, currentPage, totalPages);
        })
        .catch((e) => {
          if (e.response?.status == 401) {
            dispatch(logoutUser());
            logOutUser();
            router.push("/admin/sign-in");
          } else if (e.response?.status === 403) {
            setErrorOccured(true);
            setErrorTexxt("Oops! , You're forbidden");
          } else {
            setErrorTexxt("Server Error Occured");
            setErrorOccured(true);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setPaginationClicked(false);
          previousTrigger.current = "pagination_trigger";
        });
    }
  }, [paginationClicked]);

  useEffect(() => {
    if (emailToSuspend) {
      console.log("emailToSuspend");
      apiCall("post", `Admin/BlockUser/${emailToSuspend}`)
        .then((res) => {
          apiCall(
            "get",
            `Admin/AllUsers?Query=${queryValue}&Page=${currentPagination}&PageLimit=${10}&StartDate=${dateSet}&EndDate=${endDate}`
          )
            .then((res) => {
              const { totalPages, currentPage, totalData } =
                res?.data.data.pagination;
              setTotalUser(totalData);
              dispatch(setCurrentPagination(currentPage));
              setCustomers(res?.data.data.users);

              const paginationArray = [];
              for (let i = 1; i <= totalPages; i++) {
                paginationArray.push(i);
              }
              setPaginationValues(paginationArray);
              sortCurrentPagination(paginationArray, currentPage, totalPages);
            })
            .catch((e) => {
              if (e.response?.status == 401) {
                dispatch(logoutUser());
                logOutUser();
                router.push("/admin/sign-in");
              } else if (e.response?.status === 403) {
                setErrorOccured(true);
                setErrorTexxt("Oops! , You're forbidden");
              } else {
                setErrorTexxt("Server Error Occured");
                setErrorOccured(true);
              }
            })
            .finally(() => {
              setEmailToSuspend("");
            });
        })
        .catch((e) => {
          if (e.response?.status == 400) {
            return;
          }
          if (e.response?.status == 401) {
            dispatch(logoutUser());
            logOutUser();
            router.push("/admin/sign-in");
          } else {
            setErrorTexxt("Some Error Occured");
            setErrorOccured(true);
          }
        });
    }
  }, [emailToSuspend]);

  useEffect(() => {
    if (unSuspendEmail) {
      console.log("unsuspend-email");
      apiCall("post", `Admin/UnBlockUser/${unSuspendEmail}`)
        .then((res) => {
          apiCall(
            "get",
            `Admin/AllUsers?Query=${queryValue}&Page=${currentPagination}&PageLimit=${10}&StartDate=${dateSet}&EndDate=${endDate}`
          )
            .then((res) => {
              const { totalPages, currentPage, totalData } =
                res?.data.data.pagination;
              setTotalUser(totalData);
              dispatch(setCurrentPagination(currentPage));
              setCustomers(res?.data.data.users);

              const paginationArray = [];
              for (let i = 1; i <= totalPages; i++) {
                paginationArray.push(i);
              }
              setPaginationValues(paginationArray);
              sortCurrentPagination(paginationArray, currentPage, totalPages);
            })
            .catch((e) => {
              if (e.response?.status == 401) {
                dispatch(logoutUser());
                logOutUser();
                router.push("/admin/sign-in");
              } else if (e.response?.status === 403) {
                setErrorOccured(true);
                setErrorTexxt("Oops! , You're forbidden");
              } else {
                setErrorTexxt("Server Error Occured");
                setErrorOccured(true);
              }
            })
            .finally(() => {
              setUnSuspendEmail("");
            });
        })
        .catch((e) => {
          if (e.response?.status == 400) {
            return;
          }
          if (e.response?.status == 401) {
            dispatch(logoutUser());
            logOutUser();
            router.push("/admin/sign-in");
          } else {
            setErrorTexxt("Some Error Occured");
            setErrorOccured(true);
          }
        });
    }
  }, [unSuspendEmail]);

  useEffect(() => {
    console.log("triggered");
    apiCall(
      "get",
      `Admin/AllUsers?Query=${queryValue}&StartDate=${dateSet}&PageLimit=${10}&Page=${1}&EndDate=${endDate}`
    )
      .then((res) => {
        const { totalPages, currentPage, totalData } =
          res?.data.data.pagination;
        setTotalUser(totalData);
        dispatch(setCurrentPagination(currentPage));
        setCustomers(res?.data.data.users);

        const paginationArray = [];
        for (let i = 1; i <= totalPages; i++) {
          paginationArray.push(i);
        }
        setPaginationValues(paginationArray);
        sortCurrentPagination(paginationArray, currentPage, totalPages);
      })
      .catch((e) => {
        if (e.response?.status == 401) {
          dispatch(logoutUser());
          logOutUser();
          router.push("/admin/sign-in");
        } else {
          setErrorOccured(true);
        }
      })
      .finally(() => {
        date_triggered.current = true;
        setIsLoading(false);
        pageMounted.current = true;
      });
  }, [dateSet, queryValue, endDate]);

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex">
        <SideNav />

        <main className={styles.dashboardMainWrapper}>
          <div>
            <Navbar />
          </div>
          <div className="pr-8">
            <DashBoardHeader
              header="Manage users"
              subText="You can drill down to user to manage any user account here"
            />

            {errorOccured ? (
              <ErrorState text={errorText} />
            ) : (
              <>
                <BoxWrapper>
                  {isLoading ? (
                    <PageHeaderLoader />
                  ) : (
                    <div className="p-6 flex items-center">
                      <div>
                        <Image src={users} alt="" />
                      </div>
                      <div className="pl-4  text-center">
                        <p className="text-[#D8DFEE] text-xs font-Quiet_sans">
                          Number of users
                        </p>
                        <p className="text-2xl text-[#B0B7CA] font-Jakarta_sans ">
                          {customers?.length && <span>{totalUser}</span>}
                        </p>
                      </div>
                    </div>
                  )}
                </BoxWrapper>

                {isLoading ? (
                  <TableLoading />
                ) : (
                  <TableWrapper>
                    <TableNav currentSearchValue={queryValue} />
                    <div>
                      <TableHeader />
                    </div>

                    <div>
                      {customers?.length == 0 ? (
                        <TableEmptyState text="No user available" />
                      ) : (
                        customers?.map((item, index) => {
                          return (
                            <div key={item.id}>
                              <TableData
                                handleSuspendEmail={setEmailToSuspend}
                                handleUnSuspendEmail={setUnSuspendEmail}
                                date={item.dateRegistered}
                                handleSuspend={setSuspendTriggered}
                                id={item.id}
                                email={item.email}
                                name={item.firstName + " " + item.lastName}
                                currentIndex={index}
                                activeIndex={activeIndex}
                                handleActive={setActiveIndex}
                                balance={item.balance ? item.balance : "297400"}
                                isActive={item.lockedOut}
                              />
                            </div>
                          );
                        })
                      )}
                    </div>
                    {/* Pagination Area */}
                    {paginationsShown.length && (
                      <div className="flex justify-center py-8">
                        {paginationValues[0] !== currentPagination &&
                          paginationValues.indexOf(currentPagination) > 1 && (
                            <div
                              className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
                              onClick={() => {
                                setPaginationClicked(true);
                                dispatch(setCurrentPagination(1));
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
                              dispatch(
                                setCurrentPagination(currentPagination - 1)
                              );
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
                                dispatch(setCurrentPagination(+item));
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
                              setPaginationClicked(true);
                              dispatch(
                                setCurrentPagination(currentPagination + 1)
                              );
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
                                setPaginationClicked(true);
                                dispatch(
                                  setCurrentPagination(
                                    paginationValues[
                                      paginationValues.length - 1
                                    ]
                                  )
                                );
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
                    )}
                  </TableWrapper>
                )}
              </>
            )}
          </div>
        </main>
      </main>
    </>
  );
}

// export const getServerSideProps:GetServerSideProps = async (context:GetServerSidePropsContext) => {
//     console.log("token_value" , store.getState().userReducer.userPayload?.token)
//     return {
//       props: {},
//     };
// }
