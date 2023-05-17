import { apiCall } from "@/apiClient/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { logoutUser } from "@/store/reducers/user";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { SideNav } from "@/components/Nav/SideNav";
import styles from "../../styles/Home.module.css";
import { Navbar } from "@/components/Nav/Navbar";
import { DashBoardHeader } from "@/components/Text/DashBoard";
import { BoxWrapper } from "@/components/Wrapper/BoxWrapper";
import users from "../../public/ICONS/SVG/users.svg";
import Image from "next/image";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { MerchantTableNav } from "@/components/Nav/MerchantTableNav";
import { MerchantTableHeader } from "@/components/Table/MerchantTableHeader";
import MerchantDataTable from "@/components/Table/MerchantDataTable";
import { TableLoading } from "@/components/States/TableLoading";
import { ErrorState } from "@/components/States/ErrorState";
import { TableEmptyState } from "@/components/States/TableEmptyState";
import { savePage } from "@/store/reducers/currentPage";

export interface MerchantData {
  name: string;
  email: string;
  active: boolean;
  id: string;
  country: string;
}

function Merchant() {
  const [merchants, setMerchants] = useState<MerchantData[]>([]);
  const dispatch = useDispatch();
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    dispatch(savePage("merchant"));
    apiCall("get", "Admin/AllMerchants")
      .then((res) => {
        setMerchants(res?.data);
        setErrorText("");
        // setMerchants([]);
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          dispatch(logoutUser());
          router.push("/admin/sign-in");
        } else {
          setErrorText("Error Occured");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <Head>
        <title>Merchants</title>
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
              header="Manage Merchants"
              subText="You can drill down to user to manage any merchant here"
            />

            <BoxWrapper>
              <div className="p-6 flex items-center">
                <div>
                  <Image src={users} alt="" />
                </div>
                <div className="pl-4  ">
                  <p className="text-[#D8DFEE] text-xs font-Quiet_sans">
                    Number of merchants
                  </p>
                  <p className="text-2xl pl-3 text-[#B0B7CA] font-Jakarta_sans ">
                    0
                  </p>
                </div>
              </div>
            </BoxWrapper>
            {isLoading ? (
              <TableLoading />
            ) : (
              <>
                {errorText ? (
                  <ErrorState text="Error Occured" />
                ) : (
                  <TableWrapper>
                    <MerchantTableNav />
                    <div>
                      <MerchantTableHeader />
                    </div>
                    {merchants.length < 1 ? (
                      <TableEmptyState text="No merchants found" />
                    ) : (
                      <div>
                        {merchants.map((item, index) => {
                          return (
                            <>
                              <MerchantDataTable merchantData={item} />
                            </>
                          );
                        })}
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

export default Merchant;
