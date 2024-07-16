import React, { useState } from "react";
import { motion } from "framer-motion";

const SelectConnectingStores = () => {
  const [isSelectingFirstStore, setIsSelectingFirstStore] =
    useState<boolean>(false);
  const [isSelectingSecondStore, setIsSelectingSecondStore] =
    useState<boolean>(false);

  const connectingStoresPanel = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <>
      {!isSelectingFirstStore && !isSelectingSecondStore && (
        <motion.div
          variants={connectingStoresPanel}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mx-auto my-10 max-w-[90vw] h-[12rem] rounded-[2rem] border-4
  shadow-cMapButtonShadow border-cButtonStrokeBlue flex flex-col justify-center items-center gap-2"
        >
          <div className="flex flex-col gap-5 w-[15rem]">
            <motion.button
              className=" text-sm px-2 py-1 border-4 flex rounded-full border-cButtonStrokeBlue"
              whileHover={{
                borderColor: "#8ac4ed",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSelectingFirstStore(true)}
            >
              Select First Store
            </motion.button>
            <motion.button
              className=" text-sm px-2 py-1 border-4 flex rounded-full border-cButtonStrokeBlue"
              whileHover={{
                borderColor: "#8ac4ed",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSelectingSecondStore(true)}
            >
              Select Second Store
            </motion.button>
          </div>

          <motion.button
            className=" text-sm px-2 py-1 border-4 flex rounded-full border-blue-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Connect
          </motion.button>
        </motion.div>
      )}
      {isSelectingFirstStore && (
        <>
          <h1>Selecting First Store</h1>
        </>
      )}
       {isSelectingSecondStore && (
        <>
          <h1>Selecting First Store</h1>
        </>
      )}
    </>
  );
};

export default SelectConnectingStores;
