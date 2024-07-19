import React, { createContext, memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const SearchContext = createContext("");

const SearchButton = ({
  searchClicked,
  setsearchClicked,
  isResultPanelOpen,
  setIsResultPanelOpen,
  setSearchResult,
}: {
  searchClicked: boolean;
  setsearchClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isResultPanelOpen: boolean;
  setIsResultPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchResult: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const logoFramer = {
    openSearch: {
      width: 16 * 20,
    },
    closedSearch: {
      width: 48,
    },
  };

  const [name, setname] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const userClickedSearch = useCallback(() => {
    setsearchClicked(true);
  }, [setsearchClicked])

  useEffect(() => {
    if (searchInputRef != null) {
      searchInputRef.current?.focus();
    }
  }, [searchClicked]);

  return (
    <motion.div
      className={` ${
        searchClicked ? "px-5 justify-between " : "justify-center "
      }p-2 border-4 flex w-12 h-12  rounded-full
    shadow-cMapButtonShadow border-cButtonStrokeBlue bg-white z-10`}
      variants={logoFramer}
      animate={searchClicked ? "openSearch" : "closedSearch"}
    >
      {searchClicked ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            ref={searchInputRef}
            placeholder="Search a store"
            className="w-full outline-none px-2"
          />
          <motion.button
            onClick={() => {
              // Send a request to the backend do some async awiat
              setsearchClicked(false);
              setIsResultPanelOpen(true);
              setSearchResult(name);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Image
              src="svgs/search.svg"
              alt="search"
              height="100"
              width="20"
              draggable={false}
            />
          </motion.button>
        </>
      ) : (
        <motion.button
          onClick={userClickedSearch}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Image
            src="svgs/search.svg"
            alt="search"
            height="100"
            width="20"
            draggable={false}
          />
        </motion.button>
      )}
    </motion.div>
  );
};

export default memo(SearchButton);
