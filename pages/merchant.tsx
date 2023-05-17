import React, { useState, useEffect, useRef } from "react";
import currentPage, { savePage } from "@/store/reducers/currentPage";
import { useRouter } from "next/router";
import Head from "next/head";
import { SideNav } from "@/components/Nav/SideNav";
import { Navbar } from "@/components/Nav/Navbar";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { TableNav } from "@/components/Nav/TableNav";
import search from "../public/ICONS/SVG/search.svg";
import { setQuery } from "@/store/reducers/handleDateFilter";
import { CompanyFilterForm } from "@/components/Forms/CompanyFilterForm";
import { DatePicker, Space, Switch } from "antd";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import Select from "react-select";
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
import { logoutUser } from "@/store/reducers/user";
import { TableEmptyState } from "@/components/States/TableEmptyState";
import notFound from "@/public/ICONS/SVG/txnNotFound.svg";
import { VoucherModal } from "@/components/Modals/VoucherModal";
import { MerchantModal } from "@/components/Modals/MerchantModal";

export interface SingleMerchantObject {

  pin: string;
  amount: string;
  dateGenerated: string;
  isUsed: boolean;
  expiryDate: string;
  dateConsumed: string;
  product: string;
}


function Merchant() {
  const [singleMerchant, setSingleMerchant] = useState<SingleMerchantObject>({
    pin: "",
    amount: "",
    dateGenerated: "",
    isUsed: false,
    expiryDate: "",
    dateConsumed: "",
    product: "",
  });

  const [currentPin, setCurrentPin] = useState("");
  const [modalActive, setModalActive] = useState(false);

  const pageMounted = useRef(false);
  const { RangePicker } = DatePicker;
  const router = useRouter();

  useEffect(() => {
    if (currentPin) {
      apiCall("get", `Admin/Vouchers/Find/${currentPin}`)
        .then((res) => {
          setSingleMerchant(res?.data.data);
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

  return (
    <div>
      <Head>
        <title>Request Card Personal</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex">
       
          <MerchantModal
            merchantObject={singleMerchant}
            handleCloseModal={setModalActive}
          />
      
      </main>
    </div>
  );
}

export default Merchant;
