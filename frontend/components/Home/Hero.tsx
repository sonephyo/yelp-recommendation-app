import React from "react";
import Cbutton from "../customComponents/Cbutton";

const Hero = () => {
  return (
    <div className="relative h-screen ">
      <div className="absolute top-0 left-0 h-screen w-screen bg-gradient-to-b from-[#E3F2FD7D] from-10% via-[#0056B33D] via-80% to-white to-100% -z-10"></div>
      <div className="z-10 lg:hidden">
        <Box topPosition={"40vh"} leftPosition={"-250px"} />
        <Box topPosition={"10vh"} leftPosition={"90vw"} />
      </div>

      <div className=" flex flex-col lg:flex-row">
        <div className="relative h-[70vh] lg:hidden">
          <p className="absolute w-full font-bold text-5xl italic flex flex-row justify-center items-center z-20 bottom-[20vh] ">
            Whereabouts
          </p>
        </div>
        <div className="w-[80vw] lg:w-[30rem] mx-auto lg:mx-20 flex flex-col gap-2 lg:h-screen justify-center">
          <h1 className="hidden lg:blockfont-bold text-5xl italic">
            Whereabouts
          </h1>
          <h3 className="text-2xl font-semibold">Explore Experience Connect</h3>
          <p>
            A system that recommends user stores to explore while keeping
            experience similar to what they connect
          </p>
          <Cbutton text="Try it out" classes="w-[8rem]" />
        </div>
        <div className=" grid grid-rows-3 grid-flow-col h-full my-auto rotate-45">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className={`${ (index == 1 || index == 6) ? ' invisible' : ''} w-[150px] h-[150px] border-8  border-cBlue bg-cLightBlue rounded-[18px] `}
              style={{
                boxShadow: "14px 0px 45.9px 0px #74B8FF",
              }}
            ></div>
          ))}
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
