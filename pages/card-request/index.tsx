import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../..//styles/Home.module.css";
import { Navbar } from "@/components/Nav/Navbar";
import { DashBoardHeader } from "@/components/Text/DashBoard";
import { SideNav } from "@/components/Nav/SideNav";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { CardRequestNav } from "@/components/Nav/CardRequestNav";
import { CardsTableHeader } from "@/components/Table/CardsTableHeader";
import { CardTableData } from "@/components/Table/CardTableData";
import { useDispatch, useSelector } from "react-redux";
import { savePage } from "@/store/reducers/currentPage";
import { useRouter } from "next/router";
import { apiCall } from "@/apiClient/api";
import { logOutUser } from "@/utils/logOutUser";
import { RootState } from "@/store/store";
import paginateFirst from "../../public/ICONS/SVG/paginateFirst.svg";
import paginateLast from "../../public/ICONS/SVG/paginateLast.svg";
import paginatePrevious from "../../public/ICONS/SVG/paginatePrevious.svg";
import paginateNext from "../../public/ICONS/SVG/paginateNext.svg";
import Image from "next/image";
import { handleCurrentPagination } from "@/store/reducers/handleCardRequestFilter";
import { TableLoading } from "@/components/States/TableLoading";
import { TableEmptyState } from "@/components/States/TableEmptyState";
import { ErrorState } from "@/components/States/ErrorState";
import Cookies from "js-cookie"

function CardRequest() {
  interface RequestProps {
    address: string;
    quantity: string;
    email: string;
    companyId: string;
    id: string; 
    requestBy: string;
  }

  const pageMounted = useRef(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [companyActive, setCompanyActive] = useState(true);
  const [personalActive, setPersonalActive] = useState(false);
  const { query, date, currentPagination, endDate } = useSelector(
    (state: RootState) => state.cardRequestReducer
  );
  const [requests, setRequests] = useState<RequestProps[]>([]);
  const [paginationClicked, setPaginationClicked] = useState(false);
  const [paginationValues, setPaginationValues] = useState<number[]>([]);
  const [paginationsShown, setPaginationsShown] = useState<(number | string)[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccured, setErrorOccured] = useState(false);

  const sortCurrentPagination = (
    totalArray: (number | string)[],
    currentPagination: number,
    totalPaginations: number
  ) => {
    // Try to slice from the current to the last and see if the remaining value is less greater than 3
    const tArray = totalArray;
    //  tArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //  currentpagination = 2;
    // get the current index of the currentPage
    const currentIndex = tArray.indexOf(currentPagination);
    const mArray = tArray.slice(currentIndex);
    // mArray = [2,3,4,5,6,7,8,9,10]
    if (mArray.length > 4) {
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
      apiCall(
        "get",
        `Card/Requests?Query=${query}&PageLimit=${10}&Page=${currentPagination}&StartDate=${date}&EndDate=${endDate}`
      )
        .then((res) => {
          setRequests(res?.data.data.data);
          const { currentPage, totalData, totalPages, currentPageData } =
            res?.data.data.pagination;
          const paginationArray = [];
          for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(i);
          }

          setPaginationValues(paginationArray);
          sortCurrentPagination(paginationArray, currentPage, totalPages);
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

  useEffect(() => {
    apiCall(
      "get",
      `Card/Requests?Query=${query}&PageLimit=${10}&Page=${currentPagination}&StartDate=${date}&EndDate=${endDate}`
    )
      .then((res) => {
        setRequests(res?.data.data.data);
        const { currentPage, totalData, totalPages, currentPageData } =
          res?.data.data.pagination;
        const paginationArray = [];
        dispatch(handleCurrentPagination(currentPagination));
        for (let i = 1; i <= totalPages; i++) {
          paginationArray.push(i);
        }
        setPaginationValues(paginationArray);
        sortCurrentPagination(paginationArray, currentPage, totalPages);
        setErrorOccured(false);
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          logOutUser();
          router.push("/admin/sign-in");
          return;
        }
        setErrorOccured(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, date, endDate]);

  useEffect(() => {
    dispatch(savePage("card_request"));
    pageMounted.current = true;
  }, []);

 


  // useEffect(() => {
  //   dispatch(savePage("card_request"));
  //   apiCall("get", "Card/Requests")
  //     .then((res) => {
  //       setRequests(res?.data.data.data);
  //     })
  //     .catch((e) => {
  //       if (e.response?.status === 401) {
  //         logOutUser();
  //         router.push("/admin/sign-in");
  //       }
  //     })
  //     .finally(() => {
  //       pageMounted.current = true;
  //     });
  // }, []);

  return (
    <>
      <Head>
        <title>Request Card</title>
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
              header="Card Request"
              subText="Manage or card requests here"
            />

            <TableWrapper>
              {isLoading ? (
                <TableLoading />
              ) : errorOccured ? (
                <ErrorState text="Oops! Error Occured" />
              ) : (
                <>
                  <CardRequestNav />
                  {requests.length > 0 ? (
                    <>
                      <div>
                        <CardsTableHeader />
                      </div>
                      <div>
                        {requests?.map((item, index, root) => {
                          return (
                            <CardTableData
                              requestBy={item.requestBy}
                              address={item.address}
                              quantity={item.quantity}
                              email={item.email}
                              companyId={item.id}
                              key={index}
                            />
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
                                  dispatch(handleCurrentPagination(1));
                                  // setCurrentPagination(1);
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
                                  handleCurrentPagination(currentPagination - 1)
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
                                  dispatch(handleCurrentPagination(+item));
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
                                  handleCurrentPagination(currentPagination + 1)
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
                                    handleCurrentPagination(
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
                      )}{" "}
                    </>
                  ) : (
                    <TableEmptyState text="No request found" />
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

export default CardRequest;
