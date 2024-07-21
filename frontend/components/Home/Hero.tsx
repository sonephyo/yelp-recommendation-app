"use client";

import React from "react";
import Cbutton from "../customComponents/Cbutton";
import { motion, stagger } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const animations = {
    animate: {
      translateX: [10, 20, -20, 10],
    },
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  };

  return (
    <div className="relative min-h-screen ">
      <div className="absolute top-0 left-0 h-screen w-screen bg-gradient-to-b from-[#E3F2FD7D] from-10% via-[#0056B33D] via-80% to-white to-100% -z-10"></div>
      <div className="z-10 md:hidden">
        <Box topPosition={"40vh"} leftPosition={"-250px"} />
        <Box topPosition={"10vh"} leftPosition={"90vw"} />
      </div>

      <div className=" flex flex-col lg:flex-row justify-center gap-9 md:gap-0 items-center">
        <div className="relative h-[70vh] md:hidden">
          <p className="absolute w-full font-bold text-5xl italic flex flex-row justify-center items-center z-20 bottom-[20vh] ">
            Whereabouts
          </p>
        </div>
        <motion.div
          initial={{
            translateY: -10,
            rotate: 45,
          }}
          animate={{
            translateY: [10, -10, 10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
          className="hidden md:grid md:grid-rows-3 grid-flow-col h-full my-auto gap-2 md:translate-y-10 lg:translate-y-0"
        >
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              className={`${
                index == 1 || index == 6 ? " invisible" : ""
              } w-[150px] h-[150px] border-4  border-cBlue bg-cLightBlue rounded-xl `}
              style={{
                boxShadow: "14px 0px 45.9px 0px #74B8FF",
              }}
            ></motion.div>
          ))}
        </motion.div>
        <div className="w-[80vw] sm:w-[25rem] h-auto mx-auto md:mx-0 lg:-translate-x-32 flex flex-col gap-2 lg:h-screen justify-center lg:order-first">
          <h1 className="hidden md:block font-bold text-5xl -translate-x-2 italic">
            Whereabouts
          </h1>
          <h3 className="text-3xl font-semibold">Explore Experience Connect</h3>
          <p className="md:w-[20rem] md:text-lg">
            A system that recommends user stores to explore while keeping
            experience similar to what they connect
          </p>
          <Link href={"/maps"}>
            <Cbutton text="Try it out" classes="w-[8rem]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Box = ({
  topPosition,
  leftPosition,
}: {
  topPosition: string;
  leftPosition: string;
}) => {
  return (
    <div
      className={`absolute w-[290px] h-[290px] rotate-45 border-8 border-cBlue bg-cLightBlue rounded-[18px] `}
      style={{
        top: topPosition,
        left: leftPosition,
        boxShadow: "14px 0px 45.9px 0px #74B8FF",
      }}
    ></div>
  );
};

export default Hero;
