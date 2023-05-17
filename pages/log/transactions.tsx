import { SideNav } from "@/components/Nav/SideNav";
import Head from "next/head";
import React from "react";
import styles from "@/styles/Home.module.css";
import { Navbar } from "@/components/Nav/Navbar";
import { DetailsDashboard } from "@/components/Text/DetailsDashboard";
import { BoxWrapper } from "@/components/Wrapper/BoxWrapper";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { LogsTxnTableNav } from "@/components/Nav/LogsTxnTableNav";
import { LogsTxnDetailsHeader } from "@/components/Nav/LogsTxnDetailsHeader";
import { LogsTxnData } from "@/components/Table/LogsTxnData";
import { useRouter } from "next/router";

function Transactions() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Transactions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex">
        <SideNav />
        <section className={styles.dashboardMainWrapper}>
          <div>
            <Navbar />
          </div>
          <div className="pr-8 pt-3 mb-4">
            <DetailsDashboard
              name="Logs"
              subText="Monitor all transaction status"
            />
          </div>
          <div className="flex font-Quiet_sans text-[#D9DBE0]">
            <span
              onClick={() => {
                router.push("/log/transactions");
              }}
              className="border-b-2 pb-2 border-[#D9DBE0] cursor-pointer"
            >
              Transaction log
            </span>
            <span
              className="ml-4 pb-2 cursor-pointer"
              onClick={() => {
                router.push("/log/issues");
              }}
            >
              Issue log
            </span>
          </div>

          <div className="pr-8">
            <TableWrapper>
              <LogsTxnTableNav headerText="Transactional log" />
              <LogsTxnDetailsHeader />
              <LogsTxnData />
              <LogsTxnData />
              <LogsTxnData />
              <LogsTxnData />
            </TableWrapper>
          </div>
        </section>
      </main>
    </>
  );
}

export default Transactions;
