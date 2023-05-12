import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { SideNav } from "@/components/Nav/SideNav";
import { Navbar } from "@/components/Nav/Navbar";
import { DetailsDashboard } from "@/components/Text/DetailsDashboard";
import { TableWrapper } from "@/components/Wrapper/TableWrapper";
import { CardRequestDetailsNav } from "@/components/Nav/CardRequestDetailsNav";
import { CardRequestDetailsHeader } from "@/components/Table/CardRequestDetailsHeader";
import { CardRequestDetailsData } from "@/components/Table/CardRequestDetailsData";
import { useDispatch } from "react-redux";
import { savePage } from "@/store/reducers/currentPage";
import { FilterForm } from "@/components/Forms/FilterForm";
import { apiCall } from "@/apiClient/api";
import { logOutUser } from "@/utils/logOutUser";
import { useRouter } from "next/router";
import { TableLoading } from "@/components/States/TableLoading";
import { TableEmptyState } from "@/components/States/TableEmptyState";

function CardRequestDetails() {
  const router = useRouter();
  interface RequestListDetails {
    address: string;
    email: string;
  }

  interface AssignDetailsProps {
    cardType: string;
    id: string;
    assignedStaffID: string;
    assignedStaff: string
  }
  interface CardListNumberProps {
    cardId: string;
    ownerId: string;
  }

  interface MappedIndexProps {
    index: number;
    cardId: string;
    ownerId: string;
    validated: boolean;
    id: string;
  }

  const dispatch = useDispatch();
  const [companyActive, setCompanyActive] = useState(true);
  const [personalActive, setPersonalActive] = useState(false);
  const [cardId, setCardId] = useState("");
  const [cardNumberUnique, setCardNumberUnique] = useState(false);
  const [requestList, setRequestList] = useState<RequestListDetails>({
    address: "",
    email: "",
  });
  const [assignedCards, setAssignedCards] = useState<AssignDetailsProps[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputFocused, setInputFocused] = useState(false);
  const [validatedCardNumbers, setValidatedCardNumbers] =
    useState<CardListNumberProps[]>();
  const [mapListIndex, setMapListIndex] = useState<MappedIndexProps[]>([]);
  const [testArray, setTestArray] = useState([0, 1, 20]);
  const [requestId, setRequestId] = useState<null | string>("");
  const [dispatchCards, setDispatchCards] = useState(false);
  const [confirmRequestClicked, setConfirmRequestClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const confirmRequest = () => {
    const handleValidated = mapListIndex.map((item, index) => item.validated);
    setConfirmRequestClicked(true);
    // Now extract only the validated items and then send them as an array
    if (!mapListIndex.length) {
      setConfirmRequestClicked(false);
      return;
    }

    const requestPayload = mapListIndex.map((item, index) => {
      if (item.validated) {
        return { ownerId: item.ownerId, cardId: item.id };
      }
    });

    apiCall("post", `Card/Dispatch/${requestId}`, requestPayload)
      .then((res) => {
        console.log("suchs_that", res?.data);
      })
      .catch((e) => {
        console.log("error_found", e);
      })
      .finally(() => {
        setConfirmRequestClicked(false);
      });
  };

  useEffect(() => {
    const getQuery = new URLSearchParams(window.location.search);
    setRequestId(getQuery.get("q"));
    apiCall("get", `/Card/Request/${getQuery.get("q")}`)
      .then((res) => {
        setRequestList(res?.data.data.request);
        setAssignedCards(res?.data.data.request.assignedStaffIDs);
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          logOutUser();
          router.push("/admin/sign-in");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    dispatch(savePage("card_request"));
  }, []);

  useEffect(() => {
    if (cardId.length >= 10) {
      apiCall("get", `Card/Details/${cardId}`)
        .then((res) => {
          setCardNumberUnique(false);
          const newObject: MappedIndexProps = {
            index: activeIndex,
            cardId: cardId,
            id: res?.data.data.card.id,
            ownerId: assignedCards[activeIndex].assignedStaffID,
            validated:
              res?.data.data.card.serialNumber &&
              !res.data.data.card.assigned &&
              !mapListIndex.find((item, index) => {
                return item.cardId == cardId;
              })
                ? true
                : false,
          };

          // Now , we'd basically try to do a check to ensure that the index isn't existing already in the list of objects
          const mapListIndexCopy = [...mapListIndex];
          const checkIndex = mapListIndexCopy.findIndex((item, index) => {
            return item.index == activeIndex;
          });

          if (checkIndex !== -1) {
            mapListIndexCopy.splice(checkIndex, 1);
          }
          setMapListIndex((prev) => [...mapListIndexCopy, newObject]);
        })
        .catch((e) => {
          if (e.response?.status === 401) {
            logOutUser();
            router.push("/admin/sign-in");
          }
          if (e.response?.status === 404) {
            const newObject: MappedIndexProps = {
              index: activeIndex,
              cardId: cardId,
              id: "",
              ownerId: assignedCards[activeIndex].assignedStaffID,
              validated: false,
            };

            // Now , we'd basically try to do a check to ensure that the index isn't existing already in the list of objects
            const mapListIndexCopy = [...mapListIndex];
            const checkIndex = mapListIndexCopy.findIndex((item, index) => {
              return item.index == activeIndex;
            });

            if (checkIndex !== -1) {
              mapListIndexCopy.splice(checkIndex, 1);
            }
            // check if card number is part of the existing list

            if (mapListIndexCopy.find((item) => item.cardId == cardId)) {
              newObject.validated = false;
            }
            setMapListIndex((prev) => [...mapListIndexCopy, newObject]);
          }
        });
    } else if (cardId.length < 10) {
      if (mapListIndex.find((item, index) => item.index == activeIndex)) {
        const o_index = mapListIndex.findIndex(
          (item) => item.index == activeIndex
        );
        const n_array = [...mapListIndex];
        n_array.splice(o_index, 1);
        setMapListIndex((prev) => [...n_array]);
      }
    }
  }, [cardId, activeIndex]);

  return (
    <div>
      <Head>
        <title>Request Card Details</title>
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
          <div className="mt-4 flex justify-between mr-8 items-center">
            <DetailsDashboard
              name="Epump"
              subText="You can drill down to manage company card here"
            />
            {/* <div>
              <FilterForm />
            </div> */}
          </div>

          <div className="pr-8">
            <TableWrapper>
              {isLoading ? (
                <TableLoading />
              ) : (
                <>
                  <div>
                    <CardRequestDetailsNav
                      handleRequest={confirmRequest}
                      requestClicked={confirmRequestClicked}
                    />
                  </div>
                  <div>
                    <CardRequestDetailsHeader />
                  </div>
                  {assignedCards.length ? (
                    <div>
                      {assignedCards?.map((item, index) => {
                        return (
                          <CardRequestDetailsData
                            verifiedNumbers={mapListIndex}
                            handleActiveIndex={setActiveIndex}
                            activeIndex={activeIndex}
                            handleCardId={setCardId}
                            address={requestList?.address}
                            email={requestList?.email}
                            key={index}
                            name={item.assignedStaff}
                            cardType={item.cardType}
                            currentIndex={index}
                            cardNumberUnique={false}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <TableEmptyState text="No Request Found" />
                  )}
                </>
              )}
            </TableWrapper>
          </div>
        </main>
      </main>
    </div>
  );
}

export default CardRequestDetails;
