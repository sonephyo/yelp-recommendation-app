"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, useDragControls } from "framer-motion";

const StoreInformation = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const openAndClose = {
    open: {
      y: "-65vh",
    },
    closed: {
      y: 0,
    },
  };
  const controls = useDragControls();

  return (
    <motion.div
      className={`w-screen top-[80vh]
     h-[90vh] absolute flex flex-col bg-white px-10 py-4 pt-3 border-4 rounded-[2rem] shadow-cMapButtonShadow border-cButtonStrokeBlue overflow-x-hidden overflow-y-auto`}
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
        <p className="-translate-y-1">Explore Stores</p>
      </motion.button>
    </motion.div>
  );
};

export default StoreInformation;
