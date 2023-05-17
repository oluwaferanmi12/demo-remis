import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { SideNav } from "@/components/Nav/SideNav";
import { Navbar } from "@/components/Nav/Navbar";
import styles from "../..//styles/Home.module.css";
import { DatePicker, Space, Switch } from "antd";
import Image from "next/image";
import bill from "../../public/ICONS/SVG/bill.svg";
import unknown from "../../public/ICONS/SVG/unknown.svg";
import whbank from "../../public/ICONS/SVG/whbank.svg";
import wlogo from "../../public/ICONS/SVG/wlogo.svg";
import loading from "../../public/ICONS/SVG/loading.svg";
import whcard from "../../public/ICONS/SVG/whcard.svg";
import { apiCall } from "@/apiClient/api";
import { useDispatch } from "react-redux";
import { savePage } from "@/store/reducers/currentPage";
interface DashboardActiveProps {
  currentIndex: number;
  activeIndex: number;
  handleActive: (value: number) => void;
  active: boolean;
  id: string;
  caption: string;
}

const KillSwitch = ({ active }: DashboardActiveProps) => {
  interface DashboardProps {
    title: string;
    image: string;
    img: string;
  }
  interface RequestProps {
    status: boolean;
  }
  const dashboardList: DashboardProps[] = [
    { title: "Bank transfer", image: unknown, img: whbank },
    { title: "Remis transfer", image: unknown, img: wlogo },
    { title: "E-fuelling", image: unknown, img: loading },
    { title: "Bank transfer", image: unknown, img: whcard },
  ];

  const [requests, setRequests] = useState<RequestProps>({ status: false });
  const isActive = true;
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(savePage("admin_killswitch"));
    apiCall("get", "/Admin/TransferStatus")
      .then((res) => {
        setRequests(res?.data.status);
      })
      .catch((e) => {
        // if (e.response?.status === 401) {
        //   logOutUser();
        //   router.push("/admin/sign-in");
        // }
        // console.log(e.message);
      });
  }, []);
  const handleTurnOff = () => {
    // Make the api call to turn off general payment
    apiCall("post", "/Admin/ResumeTransfer", {})
      .then((res) => {
        // setRequests(res?.data.status);
        setRequests({ status: true });
      })
      .catch((e) => {
        setRequests({ status: false });
        // console.log(e.message);
        // console.log("got here");
      });
  };

  const handleTurnOn = () => {
    // Make the api call to turn on general payment
    apiCall("post", "/Admin/StopTransfer", {})
      .then((res) => {
        // setRequests(res?.data.status);
        setRequests({ status: false });
        // console.log("see me");
      })
      .catch((e) => {
        setRequests({ status: true });
        // console.log("errorz");
      });
  };

  return (
    <div className="">
      <Head>
        <title>Request Card Personal</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex">
        <SideNav />
        <main className={styles.dashboardMainWrapper}>
          <div className="pb-5">
            <Navbar />
          </div>
          {/* <div className="p-4 flex justify-end ">
            <Space direction="vertical" size={12}>
              <DatePicker
                format={["YYYY-MM-DD", "YYYY-MM-DD"]}
                className="placeholder:text-white "
                picker="month"
              />
            </Space>
          </div> */}
          <div className="  flex justify-between bg-[#202940] p-4 h-[159px]">
            <div className="my-6 flex items-center px-4">
              <div>
                <Image src={bill} alt="" className="mr-5" />
              </div>
              <div>
                <p className="text-[#B0B7CA] text-2xl font-bold font-Quiet_sans tracking-wide">
                  General Payment Control
                </p>
                <p className="text-[#D8DFEE] text-xs my-2 font-Quiet_sans tracking-wide">
                  Customize the status of various payment mode
                </p>
              </div>
            </div>
            <div className="flex items-center px-5">
              <Switch
                className="mr-3"
                checked={requests.status}
                onChange={(checked: boolean) => {
                  if (checked) {
                    handleTurnOff();
                    return;
                  }
                  handleTurnOn();
                }}
              />
              <p className="text-[#D8DFEE] text-xs my-2 font-Quiet_sans tracking-wide">
                Turn off all payment mode
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-8  pt-5">
            {dashboardList.map((item, index) => {
              return (
                <div
                  className="flex flex-col bg-[#202940] rounded-md"
                  style={{ height: "159px", width: "289px" }}
                  key={index}
                >
                  <div className=" p-4 flex justify-between">
                    <p className="text-[#D8DFEE] text-xs my-2 font-Quiet_sans tracking-wide">
                      {item.title}
                    </p>
                    <Image src={item.image} alt="" className="mr-5" />
                  </div>
                  <div className="p-4 ">
                    <Image src={item.img} alt="" className="mr-5" />
                  </div>
                  <div className=" flex justify-between px-4">
                    <p
                      className={`font-Quiet_sans ${
                        !active
                          ? "bg-[#ECFDF3] text-[#089430] rounded-lg p-[4px, 12px, 4px, 12px] w-[77px] h-[23px] text-center"
                          : "text-[#C42B2B] bg-[#f5aeae] rounded-lg p-[4px, 12px, 4px, 12px] w-[77px] h-[23px] text-center"
                      }`}
                    >
                      {!active ? "Active" : "Inactive"}
                    </p>
                    <Switch className="mr-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </main>
    </div>
  );
};

export default KillSwitch;
