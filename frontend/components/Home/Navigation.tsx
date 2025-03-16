"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, useCycle } from "framer-motion";
import Cbutton from "../customComponents/Cbutton";

const Navigation = () => {
  const [isOpen, toogleIsOpen] = useCycle(false, true);

  return (
    <>
      <div className="absolute w-full flex flex-col justify-center items-center my-6 text-2xl font-semibold z-30">
        <motion.div className="flex sm:container w-[20rem] min-[425px]:w-[25rem] sm:w-full flex-col border-4 p-6 md:py-3 rounded-[3rem] border-cButtonStrokeBlue items-center gap-5 shadow-md shadow-cButtonShadowBlue bg-white">
          {/* Mobile Device View */}
          <div
            className={`flex flex-row w-full justify-between items-center gap-6`}
          >
            <div className="w-[200px]">
              <Image
                src="logo/Whereabouts_logo.svg"
                alt="Whereabouts"
                width={200}
                height={16}
              />
            </div>
            <button className=" md:hidden w-[30px]">
              <Image
                src={isOpen ? `logo/cross_nav.svg` : `logo/menu_nav.svg`}
                alt="Menu"
                width={30}
                height={16}
                onClick={() => toogleIsOpen()}
              />
            </button>
            <div className="hidden md:flex md:flex-row text-lg gap-8 my-1 text-center items-center">
              <Link href="/about-us">About Us</Link>
              <div className="hidden lg:block">
                <Cbutton classes="text-base">
                  <Link href={"/maps"}>Try it out</Link>
                </Cbutton>
              </div>
            </div>
          </div>
          <motion.div
            className={`${
              isOpen ? "flex flex-col" : "hidden"
            } items-center gap-5 my-5 text-center overflow-hidden`}
            animate={{
              opacity: isOpen ? 1 : 0,
              height: isOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/about-us">About Us</Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Navigation;
