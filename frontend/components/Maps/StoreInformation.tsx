"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { storesData } from "@/public/testData/storesData";
import StoreContainer from "../customComponents/StoreContainer";

type Store = {
  id:string;
  name: string;
  address: string;
  rating: number;
};

const StoreInformation = ({
  isOpen,
  setIsOpen,
  searchResult,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchResult: string | undefined;
}) => {
  const [stores, setStores] = useState<Store[] | null>(null);

  const openAndClose = {
    open: {
      y: "-65vh",
    },
    closed: {
      y: 0,
    },
  };
  const controls = useDragControls();

  useEffect(() => {
    if (searchResult) {
      console.log("This is for recommending searched stores");
    } else {
      console.log("This is for recommending explore stores");
      setStores(storesData);
    }
  }, [searchResult]);

  return (
    <motion.div
      className={`w-screen top-[80vh]
     h-[90vh] absolute flex flex-col bg-white px-2 py-4 pt-3 border-4 rounded-[2rem] shadow-cMapButtonShadow  border-cButtonStrokeBlue `}
      variants={openAndClose}
      initial="false"
      animate={isOpen ? "open" : "closed"}
    >
      {/* Title of result */}
      <motion.button
        className="mx-auto"
        onClick={() => {
          isOpen ? setIsOpen(false) : setIsOpen(true);
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
          <p className="-translate-y-1">Explore Stores</p>
        )}
      </motion.button>
      {isOpen && (
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

export default StoreInformation;
