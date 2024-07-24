"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

const OfferInfo = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex flex-col items-center my-10">
      <h2 className=" text-4xl font-bold italic mb-3 md:mb-10 ">What we offer</h2>
      <div className="flex flex-col gap-16 md:flex-row">
        <div className="card bg-gradient-to-br from-blue-300 to-blue-200 w-[80vw] max-w-80 ">
          <figure>
            <Image
              src="/test/test1.webp"
              alt="Shoes"
              height="500"
              width="500"
            />
          </figure>
          <div className="card-body">
            <p className=" text-lg leading-5 font-semibold">
              Pick a store and we will recommend you the stores
            </p>
            <p></p>
            <div className="card-actions justify-center">
              <button
                className="btn"
                onClick={() => {
                  setisOpen(true);
                  videoRef.current!.currentTime = 0;
                  videoRef.current!.play();
                }}
              >
                See Demo
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-blue-300 to-blue-200 w-[80vw] max-w-80 ">
          <figure>
            <Image
              src="/test/test1.webp"
              alt="Shoes"
              height="500"
              width="500"
            />
          </figure>
          <div className="card-body">
            <p className=" text-lg leading-5 font-semibold">
              Pick a store and we will recommend you the stores
            </p>
            <p></p>
            <div className="card-actions justify-center">
              <button className="btn">See Demo</button>
            </div>
          </div>
        </div>
      </div>
      <PopUpBox isOpen={isOpen} setisOpen={setisOpen} videoRef={videoRef} />
    </div>
  );
};

const PopUpBox = ({
  isOpen,
  setisOpen,
  videoRef,
}: {
  isOpen: boolean;
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  return (
    <div className={`${isOpen ? "block" : "hidden"}`}>
      <button
        className="w-10 fixed z-[60] top-[calc(50vh-31vh)] lg:top-[10vh] right-[10vw] bg-white p-3 rounded-full shadow-xl shadow-cButtonShadowBlue landscape:-translate-y-10 "
        onClick={() => {
          setisOpen(false);
        }}
      >
        <Image src="/logo/cross_nav.svg" alt="Close" width={500} height={500} />
      </button>
      <video
        controls
        autoPlay
        muted
        loop
        ref={videoRef}
        className="fixed bg-slate-900 w-[80vw] h-[50vh] lg:h-[70vh] z-[60] top-[calc(50vh-25vh)] lg:top-[15vh] left-[10vw] rounded-[3rem] shadow-xl shadow-cButtonShadowBlue"
      >
        <source src={"/video.mov"} type="video/mp4" />
      </video>
      <div
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen bg-black md:inset-0 max-h-full opacity-55`}
        onClick={() => setisOpen(false)}
      ></div>
    </div>
  );
};

export default OfferInfo;
