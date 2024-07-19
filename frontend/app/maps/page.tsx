"use client";

import CLogoMap from "@/components/Maps/CLogoMap";
import MapFooterNav from "@/components/Maps/MapFooterNav";
import SearchButton from "@/components/Maps/SearchButton";
import SelectConnectingStores from "@/components/Maps/SelectConnectingStores";
import StoreInformation from "@/components/Maps/StoreInformation";
import Cbutton from "@/components/customComponents/Cbutton";
import GoogleMap from "@/components/googleMapsAPI/GoogleMap";
import { Store, storesData } from "@/public/testData/storesData";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const Maps = () => {
  const google_map_api_key = process.env
    .NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;
  const [searchClicked, setsearchClicked] = useState<boolean>(false);
  const [isResultPanelOpen, setIsResultPanelOpen] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string>();

  const cLogoRef = useRef<HTMLDivElement>(null);
  const cStoresRef = useRef<HTMLDivElement>(null);

  const closingSearchButton = useCallback( (event: MouseEvent) => {
    if (cLogoRef.current && !(cLogoRef.current as any).contains(event.target)) {
      setsearchClicked(false);
    }
    if (
      cStoresRef.current &&
      !(cStoresRef.current as any).contains(event.target)
    ) {
      setIsResultPanelOpen(false);
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", closingSearchButton);
    return () => {
      document.removeEventListener("mousedown", closingSearchButton);
    };
  }, [closingSearchButton]);


  

  return (
    <div className="relative h-screen max-h-screen overflow-hidden">
      <div className="absolute top-0 z-[1]">
        <APIProvider apiKey={google_map_api_key}>
          <GoogleMap/>
        </APIProvider>
      </div>

      <div ref={cLogoRef} className=" z-[2]">
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
          <AnimatePresence>
            {searchClicked && <SelectConnectingStores />}
          </AnimatePresence>
      </div>

      <div ref={cStoresRef}>
        <StoreInformation
          isOpen={isResultPanelOpen}
          setIsOpen={setIsResultPanelOpen}
          searchResult={searchResult}
        />
      </div>

      <div className="fixed bottom-0 z-20">
        <MapFooterNav />
      </div>
    </div>
  );
};

export default Maps;
