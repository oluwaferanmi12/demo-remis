import React, { useState, useEffect, useRef } from "react";
import currentPage, { savePage } from "@/store/reducers/currentPage";
import { useRouter } from "next/router";
import Head from "next/head";
import { SideNav } from "@/components/Nav/SideNav";
import { Navbar } from "@/components/Nav/Navbar";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import moment from "moment";
import search from "../public/ICONS/SVG/search.svg";
import { setQuery } from "@/store/reducers/handleDateFilter";
import { DatePicker, Space, Switch } from "antd";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import VoucherTableHeader from "@/components/Table/VoucherTableHeader";
import VoucherDataTable from "@/components/Table/VoucherDataTable";
import { RootState } from "@/store/store";
import { setCurrentPagination } from "@/store/reducers/handleCompanyFilter";
import paginateFirst from "../public/ICONS/SVG/paginateFirst.svg";
import paginateLast from "../public/ICONS/SVG/paginateLast.svg";
import paginatePrevious from "../public/ICONS/SVG/paginatePrevious.svg";
import paginateNext from "../public/ICONS/SVG/paginateNext.svg";
import { apiCall } from "@/apiClient/api";
import { logOutUser } from "@/utils/logOutUser";
import { TableEmptyState } from "@/components/States/TableEmptyState";
import notFound from "@/public/ICONS/SVG/txnNotFound.svg";
import { VoucherModal } from "@/components/Modals/VoucherModal";
import { VoucherFilterForm } from "@/components/Forms/VoucherFilterForm";

export interface SingleVoucherObject {
  pin: string;
  amount: string;
  dateGenerated: string;
  isUsed: boolean;
  expiryDate: string;
  dateConsumed: string;
  product: string;
}

function Vouchers(
  this: any,
  {
    headerText = "",
    handleSearchValue,
    currentSearchValue,
  }: {
    headerText?: string;
    handleSearchValue?: (value: string) => void;
    currentSearchValue?: string;
  }
) {
  interface Voucher {
    pin: string;
    dateGenerated: string;
    amount: string;
    user: string;
    isUsed: boolean;
    id: string;
    used: boolean;
    canBeUsedIn: string;
  }

  const [singleVoucher, setSingleVoucher] = useState<SingleVoucherObject>({
    pin: "",
    amount: "",
    dateGenerated: "",
    isUsed: false,
    expiryDate: "",
    dateConsumed: "",
    product: "",
  });

  const [paginationClicked, setPaginationClicked] = useState(false);
  const [paginationValues, setPaginationValues] = useState<number[]>([]);
  const [paginationsShown, setPaginationsShown] = useState<(number | string)[]>(
    []
  );
  const [voucherList, setVoucherList] = useState<Voucher[]>([]);
  const [voucherListUsed, setVoucherListUsed] = useState<Voucher[]>([]);
  const [voucherListUnUsed, setVoucherListUnUsed] = useState<Voucher[]>([]);
  const [currentPin, setCurrentPin] = useState("");
  const [modalActive, setModalActive] = useState(false);

  const pageMounted = useRef(false);
  const { RangePicker } = DatePicker;
  const router = useRouter();
  const dispatch = useDispatch();

  const [queryValue, setQueryValue] = useState("");

  const [numberOfVouchers, setNumberOfVouchers] = useState("");
  const [query, setQuery] = useState("");
  const [eDate, setEDate] = useState("");
  const [errorText, setErrorText] = useState("");
  const [options, setoptions] = useState<string>("all");
  const { date, currentPagination } = useSelector(
    (state: RootState) => state.companyFilterReducer
  );
  const [isLoading, setIsLoading] = useState(true);

  const [option, setOption] = useState("");
  type SetOption = "all" | "used" | "unused";

  const [value, setValue] = useState("");

  function handleChange(event: any) {
    setOption(event.target.value);
  }

  useEffect(() => {
    if (currentPin) {
      apiCall("get", `Admin/Vouchers/Find/${currentPin}`)
        .then((res) => {
          setSingleVoucher(res?.data.data);
          setModalActive(true);
          console.log(res?.data.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setCurrentPin("");
        });
    }
  }, [currentPin]);

  const getCurrentVoucher = (cardPin: string) => {};
  useEffect(() => {
    if (pageMounted.current) {
      apiCall(
        "get",
        `/Admin/Vouchers?Query=${query}&StartDate=${date}&PageLimit=${10}`
      )
        .then((res) => {
          // all vouchers
          setVoucherList(res?.data.data.vouchers);
          // console.log(voucherList);

          const { currentPage, totalData, totalPages, currentPageData } =
            res?.data.data.pagination;
          setCurrentPagination(1);
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
  }, [query]);

  useEffect(() => {
    if(pageMounted.current){
       apiCall(
         "get",
         `/Admin/Vouchers?Query=${query}&Page=${currentPagination}`
       )
         .then((res) => {
           setVoucherList(res?.data.data.vouchers);
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
    dispatch(savePage("vouchers"));
    apiCall("get", "/Admin/Vouchers")
      .then((res) => {
        setVoucherList(res?.data.data.vouchers);
        const { currentPage, totalData, totalPages, currentPageData } =
          res?.data.data.pagination;
        setCurrentPagination(1);
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
        <title>Request Card Personal</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex">
        <SideNav />
        {modalActive && (
          <VoucherModal
            voucherObject={singleVoucher}
            handleCloseModal={setModalActive}
          />
        )}

        <main className={styles.dashboardMainWrapper}>
          <div className="pb-5">
            <Navbar />
          </div>
          <div className="p-4">
            <h1 className="text-[#B0B7CA] text-3xl font-bold font-Quiet_sans">
              Voucher
            </h1>
            <p className="text-[#D8DFEE] text-sm my-2 font-Quiet_sans">
              You can drill down to manage your voucher
            </p>
            <div
              className=""
              style={{
                borderBottom: "1px solid #323232",
              }}
            ></div>
          </div>

          <div className="p-4 ">
            <div
              className="flex items-center justify-between bg-[#202940] h-[85px] p-4"
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <form action="">
                <div className="relative">
                  <div className="absolute top-3">
                    <Image src={search} alt="" />
                  </div>
                  <input
                    type="text"
                    value={currentSearchValue}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    className="text-[#ffffff52] placeholder:text-[#ffffff52] pl-6  placeholder:text-sm  focus:outline-none pb-1 pt-1 border-b border-[#A4AFB7] px-2 w-[200px] bg-transparent "
                    placeholder="SEARCH"
                  />
                </div>
              </form>
              <div className="flex items-center gap-2">
                <select
                  value={options}
                  onChange={(e) => {
                    setoptions(e.target.value);
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid #B0B7CA",
                    padding: "3px 7px",
                    height: "29.5px",
                    width: "123.7px",
                    borderRadius: "5px",
                    color: "#B0B7CA",
                  }}
                >
                  <option
                    className="text-[#ffffff52] bg-[#202940] "
                    value="all"
                  >
                    All
                  </option>
                  <option
                    className="text-[#ffffff52] bg-[#202940]"
                    value="used"
                  >
                    Used
                  </option>
                  <option
                    className="text-[#ffffff52] bg-[#202940]"
                    value="unused"
                  >
                    Unused
                  </option>
                </select>

                <RangePicker />
                <VoucherFilterForm />
              </div>
            </div>
            <TableWrapper>
              <div>
                <VoucherTableHeader />
              </div>
              <div>
                <div>
                  {options === "all" ? (
                    voucherList.length == 0 ? (
                      <TableEmptyState
                        icon={notFound}
                        text="No vouchers found"
                      />
                    ) : (
                      voucherList.map((item, index) => {
                        return (
                          <div key={item.id}>
                            <VoucherDataTable
                              handleCurrentPin={setCurrentPin}
                              voucherPin={item.pin}
                              dateGenerated={moment(item.dateGenerated).format(
                                "YY-MM-DD, HH:mm"
                              )}
                             
                              amount={item.amount}
                              user={item.user}
                              // count={index}
                              voucherStatus={item.isUsed}
                              currentIndex={0}
                              activeIndex={0}
                              handleActive={function (value: number): void {
                                throw new Error("Function not implemented.");
                              }}
                              active={false}
                              id={""}
                            />
                          </div>
                        );
                      })
                    )
                  ) : options === "used" ? (
                    voucherListUsed.length == 0 ? (
                      <TableEmptyState
                        icon={notFound}
                        text="No vouchers found"
                      />
                    ) : (
                      voucherListUsed.map((item, index) => {
                        return (
                          <div key={item.id}>
                            <VoucherDataTable
                              handleCurrentPin={setCurrentPin}
                              voucherPin={item.pin}
                              dateGenerated={moment(item.dateGenerated).format(
                                "YY-MM-DD, HH:mm"
                              )}
                             
                              amount={item.amount}
                              user={item.user}
                              // count={index}
                              voucherStatus={item.isUsed}
                              currentIndex={0}
                              activeIndex={0}
                              handleActive={function (value: number): void {
                                throw new Error("Function not implemented.");
                              }}
                              active={false}
                              id={""}
                            />
                          </div>
                        );
                      })
                    )
                  ) : options === "unused" ? (
                    voucherListUnUsed.length == 0 ? (
                      <TableEmptyState
                        icon={notFound}
                        text="No vouchers found"
                      />
                    ) : (
                      voucherListUnUsed.map((item, index) => {
                        return (
                          <div key={item.id}>
                            <VoucherDataTable
                              handleCurrentPin={setCurrentPin}
                              voucherPin={item.pin}
                              dateGenerated={moment(item.dateGenerated).format(
                                "YY-MM-DD, HH:mm"
                              )}
                             
                              amount={item.amount}
                              user={item.user}
                              // count={index}
                              voucherStatus={item.isUsed}
                              currentIndex={0}
                              activeIndex={0}
                              handleActive={function (value: number): void {
                                throw new Error("Function not implemented.");
                              }}
                              active={false}
                              id={""}
                            />
                          </div>
                        );
                      })
                    )
                  ) : null}
                </div>
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
                        dispatch(setCurrentPagination(currentPagination - 1));
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
                        dispatch(setCurrentPagination(currentPagination + 1));
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
                          dispatch(
                            setCurrentPagination(
                              paginationValues[paginationValues.length - 1]
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
            </TableWrapper>
          </div>
        </main>
      </main>
    </div>
  );
}

export default Vouchers;
