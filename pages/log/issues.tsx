import { SideNav } from "@/components/Nav/SideNav";
import Head from "next/head";
import React from "react";
import styles from "@/styles/Home.module.css";
import { Navbar } from "@/components/Nav/Navbar";
import { DetailsDashboard } from "@/components/Text/DetailsDashboard";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { LogsIssuesTableNav } from "@/components/Nav/LogIssuesTableNav";
import { LogsIssuesDetailsHeader } from "@/components/Table/LogIssuesDetailsHeader";
import { LogsIssuesData } from "@/components/Table/LogIssuesData";
import { useRouter } from "next/router";

function Issues() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Issues log</title>
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
              className="pb-2 cursor-pointer"
              onClick={() => {
                router.push("/log/transactions");
              }}
            >
              Transaction log
            </span>
            <span
              className="ml-4 pb-2 cursor-pointer border-b-2 border-[#D9DBE0]"
              onClick={() => {
                router.push("/log/issues");
              }}
            >
              Issue log
            </span>
          </div>

          <div className="pr-8">
            <TableWrapper>
              <LogsIssuesTableNav headerText="Issues log" />
              <LogsIssuesDetailsHeader />
              <LogsIssuesData />
              <LogsIssuesData />
              <LogsIssuesData />
              <LogsIssuesData />
            </TableWrapper>
          </div>
        </section>
      </main>
    </>
  );
}

export default Issues;
