"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

const OfferInfo = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  return (
    <div className="flex flex-col items-center my-10">
      <h2 className=" text-4xl font-bold italic mb-3 md:mb-10 ">Features</h2>
      <div className="flex flex-col gap-16 md:flex-row">
        <div className="card bg-gradient-to-br from-blue-300 to-blue-200 w-[80vw] max-w-80 ">
          <figure>
            <Image
              src="/pics/selectBusiness.png"
              alt="Shoes"
              height="500"
              width="500"
            />
          </figure>
          <div className="card-body">
            <p className=" text-lg leading-5 font-semibold">
              Pick a store and we will recommend a store you will love
            </p>
            <p></p>
            <div className="card-actions justify-center">
              <button
                className="btn"
                onClick={() => {
                  setisOpen(true);
                  setSelectedVideo("/videos/selectBusiness.mov");
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
              src="/pics/dynamicsearch.png"
              alt="Shoes"
              height="500"
              width="500"
            />
          </figure>
          <div className="card-body">
            <p className=" text-lg leading-5 font-semibold">
              Dynamic Searching for you to research your store
            </p>
            <p></p>
            <div className="card-actions justify-center">
              <button
                className="btn"
                onClick={() => {
                  setisOpen(true);
                  setSelectedVideo("/videos/dynamicsearch.mov");
                }}
              >
                See Demo
              </button>
            </div>
          </div>
        </div>
      </div>
      <PopUpBox
        isOpen={isOpen}
        setisOpen={setisOpen}
        videoSrc={selectedVideo}
        setSelectedVideo={setSelectedVideo}
      />
    </div>
  );
};

const PopUpBox = ({
  isOpen,
  setisOpen,
  videoSrc,
  setSelectedVideo
}: {
  isOpen: boolean;
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
  videoSrc: string;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div className={`${isOpen ? "block" : "hidden"}`}>
      <button
        className="w-10 fixed z-[60] top-[calc(50vh-31vh)] lg:top-[10vh] right-[10vw] bg-white p-3 rounded-full shadow-xl shadow-cButtonShadowBlue landscape:-translate-y-10 "
        onClick={() => {
          setisOpen(false)
          setSelectedVideo("")
        }}
      >
        <Image src="/logo/cross_nav.svg" alt="Close" width={500} height={500} />
      </button>
      {videoSrc && (
        <video
          controls
          autoPlay
          muted
          loop
          className="fixed bg-slate-900 w-[80vw] h-[50vh] lg:h-[70vh] z-[60] top-[calc(50vh-25vh)] lg:top-[15vh] left-[10vw] rounded-[3rem] shadow-xl shadow-cButtonShadowBlue"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen bg-black md:inset-0 max-h-full opacity-55`}
        onClick={() => {
          setisOpen(false)
          setSelectedVideo("")
          }}
      ></div>
    </div>
  );
};

export default OfferInfo;
