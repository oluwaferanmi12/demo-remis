import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { savePage } from "@/store/reducers/currentPage";
import { SideNav } from "@/components/Nav/SideNav";
import styles from "@/styles/Home.module.css";
import { Navbar } from "@/components/Nav/Navbar";
import { DetailsDashboard } from "@/components/Text/DetailsDashboard";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { CardRequestDetailsNav } from "@/components/Nav/CardRequestDetailsNav";
import { CardManagementListHeader } from "@/components/Table/CardManagementListHeader";
import { CardManagementListDetails } from "@/components/Table/CardManagementListDetails";
import { useRouter } from "next/router";
import { CardManagementListNav } from "@/components/Nav/CardManagementListNav";
import { apiCall } from "@/apiClient/api";
import { logOutUser } from "@/utils/logOutUser";
import paginateFirst from "../../public/ICONS/SVG/paginateFirst.svg";
import paginateLast from "../../public/ICONS/SVG/paginateLast.svg";
import paginatePrevious from "../../public/ICONS/SVG/paginatePrevious.svg";
import paginateNext from "../../public/ICONS/SVG/paginateNext.svg";
import Image from "next/image";
import { TableLoading } from "@/components/States/TableLoading";
import { TableEmptyState } from "@/components/States/TableEmptyState";
import { RootState } from "@/store/store";
import { handleCurrentPagination } from "@/store/reducers/handleCardManagement";

function CompanyCardManagementList() {
  interface CardProps {
    userName: string;
    cardType: string;
    cardNumber: string;
    locked: boolean;
    id: string;
  }
  const dispatch = useDispatch();
  const [cards, setCards] = useState<CardProps[]>([]);
  const router = useRouter();
  const pageMounted = useRef(false);
  const [paginationClicked, setPaginationClicked] = useState(false);
  const [paginationValues, setPaginationValues] = useState<number[]>([]);
  const [paginationsShown, setPaginationsShown] = useState<(number | string)[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const { currentPagination, query: queryValue } = useSelector(
    (state: RootState) => state.cardMangementReducer
  );

  useEffect(() => {
    if (pageMounted.current) {
      apiCall("get", `Card/All?Query=${queryValue}`)
        .then((res) => {
          setCards(res?.data.data.cards);
          const { currentPage, totalData, totalPages, currentPageData } =
            res?.data.data.pagination;
          dispatch(handleCurrentPagination(1));
          const paginationArray = [];
          for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(i);
          }
          setPaginationValues(paginationArray);
          sortCurrentPagination(paginationArray, currentPage, totalPages);
          setErrorText("");
        })
        .catch((e) => {
          if (e.response?.status === 401) {
            logOutUser();
            router.push("/admin/sign-in");
          }
          setErrorText("Error Occured");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [queryValue]);

  useEffect(() => {
    if (pageMounted.current) {
      apiCall("get", `Card/All?Query=${queryValue}&Page=${currentPagination}`)
        .then((res) => {
          setCards(res?.data.data.cards);
          const { currentPage, totalData, totalPages, currentPageData } =
            res?.data.data.pagination;
          const paginationArray = [];
          for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(i);
          }

          setPaginationValues(paginationArray);
          sortCurrentPagination(paginationArray, currentPage, totalPages);
          setErrorText("");
        })
        .catch((e) => {
          if (e.response?.status === 401) {
            logOutUser();
            router.push("/admin/sign-in");
          }
          setErrorText("Error Occured");
        })
        .finally(() => {
          setPaginationClicked(false);
        });
    }
  }, [paginationClicked]);

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
    dispatch(savePage("card_management"));
    apiCall("get", `Card/All?Query=${queryValue}&Page=${currentPagination}`)
      .then((res) => {
        setCards(res?.data.data.cards);
        const { currentPage, totalData, totalPages, currentPageData } =
          res?.data.data.pagination;
        dispatch(handleCurrentPagination(currentPagination));
        const paginationArray = [];
        for (let i = 1; i <= totalPages; i++) {
          paginationArray.push(i);
        }
        setPaginationValues(paginationArray);
        sortCurrentPagination(paginationArray, currentPage, totalPages);
        setErrorText("");
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          logOutUser();
          router.push("/admin/sign-in");
        }
        setErrorText("Error Occured");
      })
      .finally(() => {
        setIsLoading(false);
        pageMounted.current = true;
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Company Card List</title>
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
          <div className="mt-3 mb-3">
            <DetailsDashboard
              name="Card management"
              subText="You can drill down to manage company card here"
            />
          </div>
          {/* <div className="font-Quiet_sans flex mb-8 text-[#D9DBE0]">
            <p
              className="py-2 border-b-2 cursor-pointer border-[#D9DBE0]"
              onClick={() => {
                router.push("/card-management");
              }}
            >
              Company
            </p>
            <p
              className="ml-4 py-2 cursor-pointer"
              onClick={() => {
                router.push("/card-management/personal");
              }}
            >
              Personal
            </p>
          </div> */}
          <div className="pr-8">
            <TableWrapper>
              {isLoading ? (
                <TableLoading />
              ) : (
                <>
                  <div>
                    <CardManagementListNav />
                  </div>
                  <div>
                    <CardManagementListHeader />
                  </div>
                  <>
                    {errorText ? (
                      <TableEmptyState text="Some Error Occured" />
                    ) : cards?.length ? (
                      <>
                        <div>
                          {cards?.map((item, index) => {
                            return (
                              <CardManagementListDetails
                                cardType={item.cardType}
                                username={item.userName}
                                cardNumber={item.cardNumber}
                                locked={item.locked}
                                key={index}
                                id={item.id}
                              />
                            );
                          })}
                        </div>
                        {paginationsShown.length ? (
                          <div className="flex justify-center py-8">
                            {paginationValues[0] !== currentPagination &&
                              paginationValues.indexOf(currentPagination) >
                                1 && (
                                <div
                                  className="bg-[#111827] p-4 rounded-xl mr-2 cursor-pointer"
                                  onClick={() => {
                                    dispatch(handleCurrentPagination(1));
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
                                    handleCurrentPagination(
                                      currentPagination - 1
                                    )
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
                                    handleCurrentPagination(
                                      currentPagination + 1
                                    )
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
                        )}
                      </>
                    ) : (
                      <TableEmptyState text="No card found" />
                    )}
                  </>
                </>
              )}
            </TableWrapper>
          </div>
        </main>
      </main>
    </div>
  );
}

export default CompanyCardManagementList;
