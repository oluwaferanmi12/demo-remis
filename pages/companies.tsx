import currentPage, { savePage } from "@/store/reducers/currentPage";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { Navbar } from "@/components/Nav/Navbar";
import { SideNav } from "@/components/Nav/SideNav";
import styles from "../styles/Home.module.css";
import { DashBoardHeader } from "@/components/Text/DashBoard";
import users from "../public/ICONS/SVG/users.svg";
import Image from "next/image";
import { BoxWrapper } from "@/components/Wrapper/BoxWrapper";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { CompanyTableHeader } from "@/components/Table/CompanyTableHeader";
import CompanyDataTable from "@/components/Table/CompanyDataTable";
import { apiCall } from "@/apiClient/api";
import { useRouter } from "next/router";
import { logOutUser } from "@/utils/logOutUser";
import { logoutUser } from "@/store/reducers/user";
import { TableLoading } from "@/components/States/TableLoading";
import { CompanyTableNav } from "@/components/Nav/CompanyTableNav";
import { RootState } from "@/store/store";
import paginateFirst from "../public/ICONS/SVG/paginateFirst.svg";
import paginateLast from "../public/ICONS/SVG/paginateLast.svg";
import paginatePrevious from "../public/ICONS/SVG/paginatePrevious.svg";
import paginateNext from "../public/ICONS/SVG/paginateNext.svg";
import { setCurrentPagination } from "@/store/reducers/handleCompanyFilter";
import { TableEmptyState } from "@/components/States/TableEmptyState";
import withAuth from "@/components/HOC/WithAuth";
import { GetServerSideProps } from "next";
import { extractCookie } from "@/utils/getTokenFromCookie";
import { validateCookie } from "@/utils/validateCookie";

function Companies({ token }: { token: string }) {
  interface Company {
    name: string;
    email: string;
    balance: string;
    isActive: boolean;
    staffCount: string;
    kycVerified: boolean;
    id: string;
  }

  const router = useRouter();
  const dispatch = useDispatch();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [errorOccured, setErrorOccured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfCompanies, setNumberOfCompanies] = useState("");
  const [paginationClicked, setPaginationClicked] = useState(false);
  const [paginationValues, setPaginationValues] = useState<number[]>([]);
  const [paginationsShown, setPaginationsShown] = useState<(number | string)[]>(
    []
  );
  const { date, query, currentPagination, startDate, endDate } = useSelector(
    (state: RootState) => state.companyFilterReducer
  );
  const pageMounted = useRef(false);

  useEffect(() => {
    if (pageMounted.current) {
      apiCall("get", `Admin/Companies?Query=`);
    }
  }, [query, date]);

  useEffect(() => {
    if (pageMounted.current) {
      apiCall(
        "get",
        `Admin/Companies?Query=${query}&Page=${currentPagination}&StartDate=${date}&PageLimit=${10}`
      )
        .then((res) => {
          const { customers, pagination } = res?.data.data;
          const { totalData, currentPage, totalPages } = pagination;
          setNumberOfCompanies(totalData);
          setCompanies(customers);
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
          setPaginationClicked(false);
        });
    }
  }, [paginationClicked]);

  useEffect(() => {
    if (pageMounted.current) {
      apiCall(
        "get",
        `Admin/Companies?Query=${query}&StartDate=${startDate}&endDate=${endDate}&PageLimit=${10}&Page=${currentPagination}`
      )
        .then((res) => {
          const { customers, pagination } = res?.data.data;
          const { totalData, currentPage, totalPages } = pagination;

          setNumberOfCompanies(totalData);
          setCompanies(customers);
          dispatch(setCurrentPagination(1));
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
        });
    }
  }, [query, endDate, startDate]);

  useEffect(() => {
    // setCurrentPage

    apiCall(
      "get",
      `Admin/Companies?Query=${query}&StartDate=${date}&PageLimit=${10}&Page=${currentPagination}`
    )
      .then((res) => {
        const { customers, pagination } = res?.data.data;
        const { totalData, currentPage, totalPages } = pagination;

        setNumberOfCompanies(totalData);
        setCompanies(customers);
        dispatch(setCurrentPagination(currentPagination));
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
        pageMounted.current = true;
        setIsLoading(false);
      });

    dispatch(savePage("company"));
  }, []);

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

    if (mArray.length > 4) {
      const arrayToShow = mArray.splice(0, 3);
      arrayToShow.push("...");
      arrayToShow.push(totalPaginations);
      setPaginationsShown(arrayToShow);
    } else {
      setPaginationsShown(mArray);
    }
  };

  return (
    <>
      <Head>
        <title>Companies</title>
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
              header="Manage Companies"
              subText="You can drill down to user to manage any user account here"
            />

            <BoxWrapper>
              <div className="p-6 flex items-center">
                <div>
                  <Image src={users} alt="" />
                </div>
                <div className="pl-4  ">
                  <p className="text-[#D8DFEE] text-xs font-Quiet_sans">
                    Number of company users
                  </p>
                  <p className="text-2xl pl-3 text-[#B0B7CA] font-Jakarta_sans ">
                    {numberOfCompanies ? numberOfCompanies : "0"}
                  </p>
                </div>
              </div>
            </BoxWrapper>

            <TableWrapper>
              {isLoading ? (
                <TableLoading />
              ) : (
                <>
                  <CompanyTableNav currentSearchValue={query} />

                  <div>
                    <CompanyTableHeader />
                  </div>
                  {companies.length ? (
                    <>
                      <div>
                        {companies.map((item, index) => {
                          return (
                            <div key={index}>
                              <CompanyDataTable
                                id={item.id}
                                name={item.name}
                                email={item.email}
                                balance={item.balance}
                                noOfStaffs={item.staffCount}
                                active={item.isActive}
                                kycVerified={item.kycVerified}
                                currentIndex={index}
                                activeIndex={activeIndex}
                                handleActive={setActiveIndex}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {paginationsShown.length ? (
                        <div className="flex justify-center py-8">
                          {paginationValues[0] !== currentPagination &&
                            paginationValues.indexOf(currentPagination) > 1 && (
                              <div
                                className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
                                onClick={() => {
                                  dispatch(setCurrentPagination(1));
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
                                dispatch(
                                  setCurrentPagination(currentPagination + 1)
                                );
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
                                  dispatch(
                                    setCurrentPagination(
                                      paginationValues[
                                        paginationValues.length - 1
                                      ]
                                    )
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
                  ) : (
                    <TableEmptyState text="No Company Found" />
                  )}
                </>
              )}
            </TableWrapper>
          </div>
        </main>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const validCookie = validateCookie(req);
  if (!validCookie) {
    return {
      redirect: {
        destination: "/admin/sign-in",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Companies;
