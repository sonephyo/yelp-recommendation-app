"use client";

import CLogoMap from "@/components/Maps/CLogoMap";
import MapFooterNav from "@/components/Maps/MapFooterNav";
import SearchButton from "@/components/Maps/SearchButton";
import SelectConnectingStores from "@/components/Maps/SelectConnectingStores";
import StoreInformation from "@/components/Maps/StoreInformation";
import Cbutton from "@/components/customComponents/Cbutton";
import MapTest from "@/components/googleMapsAPI/MapTest";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const Maps = () => {
  const [searchClicked, setsearchClicked] = useState<boolean>(false);
  const [selectedStores, setselectedStores] = useState<string[]>([]);
  const [isResultPanelOpen, setIsResultPanelOpen] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string>();

  const cLogoRef = useRef<HTMLDivElement>(null);
  const cStoresRef = useRef<HTMLDivElement>(null);

  const closingSearchButton = (event: MouseEvent) => {
    if (cLogoRef.current && !(cLogoRef.current as any).contains(event.target)) {
      setsearchClicked(false);
    }
    if (
      cStoresRef.current &&
      !(cStoresRef.current as any).contains(event.target)
    ) {
      setIsResultPanelOpen(false);
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
      <MapTest />

      <div ref={cLogoRef}>
        <div className=" mx-4 my-3 flex flex-row justify-between items-center bg-transparent">
          <CLogoMap searchClicked={searchClicked} />
          <SearchButton
            setsearchClicked={setsearchClicked}
            searchClicked={searchClicked}
            isResultPanelOpen={isResultPanelOpen}
            setIsResultPanelOpen={setIsResultPanelOpen}
            setSearchResult={setSearchResult}
          />
        </div>

        <div className="z-10">
          <AnimatePresence>
            {searchClicked && <SelectConnectingStores />}
          </AnimatePresence>
        </div>
      </div>

      <div ref={cStoresRef}>
        <StoreInformation
          isOpen={isResultPanelOpen}
          setIsOpen={setIsResultPanelOpen}
          searchResult={searchResult}
        />
      </div>

      <div className="fixed bottom-0">
        <MapFooterNav />
      </div>
    </div>
  );
};

export default Maps;
