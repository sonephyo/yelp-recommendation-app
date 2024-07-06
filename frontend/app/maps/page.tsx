"use client";

import CLogoMap from "@/components/Maps/CLogoMap";
import MapFooterNav from "@/components/Maps/MapFooterNav";
import SearchButton from "@/components/Maps/SearchButton";
import SelectConnectingStores from "@/components/Maps/SelectConnectingStores";
import StoreInformation from "@/components/Maps/StoreInformation";
import Cbutton from "@/components/customComponents/Cbutton";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const Maps = () => {
  const [searchClicked, setsearchClicked] = useState<boolean>(false);
  const [selectedStores, setselectedStores] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const cLogoRef = useRef<HTMLDivElement>(null);
  const cStoresRef = useRef<HTMLDivElement>(null);

  const closingSearchButton = (event: MouseEvent) => {
    if (cLogoRef.current && !(cLogoRef.current as any).contains(event.target)) {
      setsearchClicked(false);
    }
    if (cStoresRef.current && !(cStoresRef.current as any).contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closingSearchButton);
    return () => {
      document.removeEventListener("mousedown", closingSearchButton);
    };
  }, []);

  return (
    <div className="relative h-screen max-h-screen overflow-hidden">
      <div ref={cLogoRef}>
        <div className=" mx-4 my-3 flex flex-row justify-between items-center">
          <CLogoMap searchClicked={searchClicked} />
          <SearchButton
            setsearchClicked={setsearchClicked}
            searchClicked={searchClicked}
          />
        </div>
        <AnimatePresence>
          {searchClicked && <SelectConnectingStores />}
        </AnimatePresence>
      </div>

      <div ref={cStoresRef}>
        <StoreInformation isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div className="fixed bottom-0">
        <MapFooterNav />
      </div>
    </div>
  );
};

export default Maps;
