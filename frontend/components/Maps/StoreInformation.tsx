"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { storesData } from "@/public/testData/storesData";
import StoreContainer from "../customComponents/StoreContainer";
import axios from "axios";
import { DisplayType } from "@/public/enum/DisplayType";
import { indStoreInformationDataType } from "@/public/dataType/StoreInformationDataType";
import DisplayStoreInformation from "../storeMapDisplay/DisplayStoreInformation";

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
  const [indStoreDisplayObject, setindStoreDisplayObject] =
    useState<indStoreInformationDataType | null>(null);

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
      settypeOfStoreInformation(DisplayType.SEARCH_STORE);
    } else {
      setStores(storesData);
    }
  }, [searchResult]);

  useEffect(() => {
    const fetchIndBusiness = async (businessId: string) => {
      console.log(businessId)
      const singleBusinessInfo = await axios
        .get(`${backend_url}/get-business`, {
          params: { businessId: businessId },
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
      setIsResultPaneOpen(true);
      settypeOfStoreInformation(DisplayType.DISPLAY_STORE);

      fetchIndBusiness(indStoreId).then((res) => {
        setindStoreDisplayObject(res);
      });
    }
  }, [backend_url, indStoreId]);

  useEffect(() => {
    console.log(typeOfStoreInformation);
  }, [typeOfStoreInformation]);
  return (
    <motion.div
      className={`w-screen top-[80vh]
     h-[90vh] absolute flex flex-col bg-white px-2 py-4 pt-3 pb-28 border-4 rounded-[2rem] shadow-cMapButtonShadow  border-cButtonStrokeBlue z-10 `}
      variants={openAndClose}
      initial="false"
      animate={isResultPaneOpen ? "open" : "closed"}
    >
      <motion.button
        className="mx-auto"
        onClick={() => {
          isResultPaneOpen
            ? setIsResultPaneOpen(false)
            : setIsResultPaneOpen(true);
        }}
      >
        <Image
          src="svgs/arrow.svg"
          alt="arrow"
          height={30}
          width={30}
          className="rotate-90 mx-auto"
        />
        {/* Title Displays */}
        {typeOfStoreInformation == DisplayType.EXPLORE_STORE && (
          <p className="-translate-y-1">Explore Store</p>
        )}
        {typeOfStoreInformation == DisplayType.DISPLAY_STORE && (
          <p className="-translate-y-1">{(indStoreDisplayObject && !isResultPaneOpen )? indStoreDisplayObject.name : ""}</p>
        )}
        {searchResult && typeOfStoreInformation == DisplayType.SEARCH_STORE && (
          <p className="-translate-y-1">
            Search Result for &quot;{searchResult}&quot;
          </p>
        )}
      </motion.button>

      {/* Stores information - Random */}
      {isResultPaneOpen &&
        typeOfStoreInformation == DisplayType.EXPLORE_STORE && (
          <div className=" overflow-x-hidden overflow-y-auto">
            Testing Explore Store
          </div>
        )}

      {/* Search information - selecting from google map */}
      {isResultPaneOpen &&
        indStoreDisplayObject &&
        typeOfStoreInformation == DisplayType.DISPLAY_STORE && (
            <DisplayStoreInformation storeData={indStoreDisplayObject}/>
         
        )}

      {/* Store information - result from the search box */}
      {searchResult &&
        isResultPaneOpen &&
        typeOfStoreInformation == DisplayType.SEARCH_STORE && (
          <div className=" overflow-x-hidden overflow-y-auto">
            Testing searchStore
          </div>
        )}
    </motion.div>
  );
};

export default React.memo(StoreInformation);
