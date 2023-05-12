import { savePage } from "@/store/reducers/currentPage";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { SideNav } from "@/components/Nav/SideNav";
import styles from "../../styles/Home.module.css";
import { Navbar } from "@/components/Nav/Navbar";
import { DashBoardHeader } from "@/components/Text/DashBoard";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { CardManagementNav } from "@/components/Nav/CardManagementNav";
import { CardsMangementTableHeader } from "@/components/Table/CardManagementTableHeader";
import { CardManagementTableData } from "@/components/Table/CardManagementTableData";
import { useRouter } from "next/router";

function CardManagement() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [companyActive, setCompanyActive] = useState(true);
  const [personalActive, setPersonalActive] = useState(false);
  useEffect(() => {
    dispatch(savePage("card_management"));
  }, []);

  return (
    <>
      <Head>
        <title>Manage Card</title>
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
              header="Card Management"
              subText="Manage all type of cards for users"
            />
            <div className="font-Quiet_sans flex mb-8 text-[#D9DBE0]">
              <p
                onClick={() => {
                  router.push("/card-management");
                }}
                className="py-2 border-b-2 cursor-pointer border-[#D9DBE0]"
              >
                Company
              </p>
              <p
                onClick={() => {
                  router.push("/card-management/personal");
                }}
                className="ml-4 py-2 cursor-pointer"
              >
                Personal
              </p>
            </div>
            <TableWrapper>
              <CardManagementNav />
              <div>
                <CardsMangementTableHeader />
              </div>
              <div>
                <CardManagementTableData />
                <CardManagementTableData />
                <CardManagementTableData />
                <CardManagementTableData />
                <CardManagementTableData />
                <CardManagementTableData />
              </div>
            </TableWrapper>
          </div>
        </main>
      </main>
    </>
  );
}

export default CardManagement;
