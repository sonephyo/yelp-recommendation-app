"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { storesData } from "@/public/testData/storesData";
import StoreContainer from "../customComponents/StoreContainer";
import axios from "axios";
import { DisplayType } from "@/public/enum/DisplayType";

type Store = {
  id: string;
  name: string;
  address: string;
  rating: number;
};

const StoreInformation = ({
  isResultPaneOpen,
  setIsResultPaneOpen,
  searchResult,
  settypeOfStoreInformation,
  typeOfStoreInformation,
  indStoreId,
}: {
  isResultPaneOpen: boolean;
  setIsResultPaneOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchResult: string | undefined;
  settypeOfStoreInformation: React.Dispatch<React.SetStateAction<DisplayType>>;
  typeOfStoreInformation: DisplayType;
  indStoreId: string;
}) => {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

  const [stores, setStores] = useState<Store[] | null>(null);

  const openAndClose = {
    open: {
      y: "-65vh",
    },
    closed: {
      y: 0,
    },
  };

  useEffect(() => {
    if (searchResult) {
    } else {
      setStores(storesData);
    }
  }, [searchResult]);

  useEffect(() => {
    const fetchIndBusiness = async (businessId: string) => {
      const singleBusinessInfo = await axios
        .get(`${backend_url}/get-business`, {
          params: { id: businessId },
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return singleBusinessInfo;
    };

    if (indStoreId) {
      console.log(indStoreId)
      const indBusiness = fetchIndBusiness(indStoreId);
      setIsResultPaneOpen(true)
      settypeOfStoreInformation(DisplayType.DISPLAY_STORE)
    }
  }, [backend_url, indStoreId]);

  return (
    <motion.div
      className={`w-screen top-[80vh]
     h-[90vh] absolute flex flex-col bg-white px-2 py-4 pt-3 border-4 rounded-[2rem] shadow-cMapButtonShadow  border-cButtonStrokeBlue z-10 `}
      variants={openAndClose}
      initial="false"
      animate={isResultPaneOpen ? "open" : "closed"}
    >
      {/* Title of result */}
      <motion.button
        className="mx-auto"
        onClick={() => {
          isResultPaneOpen ? setIsResultPaneOpen(false) : setIsResultPaneOpen(true);
        }}
      >
        <Image
          src="svgs/arrow.svg"
          alt="arrow"
          height={30}
          width={30}
          className="rotate-90 mx-auto"
        />
        {searchResult ? (
          <p className="-translate-y-1">
            Search Result for &quot;{searchResult}&quot;
          </p>
        ) : (
          <p className="-translate-y-1">{typeOfStoreInformation}</p>
        )}
      </motion.button>
      {isResultPaneOpen && typeOfStoreInformation==DisplayType.EXPLORE_STORE && (
        <div className=" overflow-x-hidden overflow-y-auto">
          {stores ? (
            <div className="flex flex-col gap-10 overflow-hidden">
              {storesData.map((store) => (
                <StoreContainer store={store} key={store.id} />
              ))}
            </div>
          ) : (
            <div>There is no recommended stores</div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default React.memo(StoreInformation);
