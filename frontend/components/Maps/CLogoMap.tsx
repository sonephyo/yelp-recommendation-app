import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CLogoMap = ({ searchClicked }: { searchClicked: boolean }) => {
  const searchFramer = {
    closedSearch: {
      width: 20,
    },
    openSearch: {
      width: 120,
    },
  };
  return (
    <div
      className="py-3 px-4 border-4 flex w-auto justify-center rounded-full
     shadow-cMapButtonShadow border-cButtonStrokeBlue mr-5"
    >
      <Link href="/" className="">
        <motion.div
          whileHover={{
            scale: 1.2,
          }}
          variants={searchFramer}
          animate={`${searchClicked ? "closedSearch" : "openSearch"}`}
        >
          <Image
            alt="whereabouts"
            src={`${
              searchClicked
                ? "logo/Whereabouts_logo_short.svg"
                : "logo/Whereabouts_logo.svg"
            }`}
            height={`${searchClicked ? "16" : "100"}`}
            width={`${searchClicked ? "20" : "120"}`}
          />
        </motion.div>
      </Link>
    </div>
  );
};

export default CLogoMap;
