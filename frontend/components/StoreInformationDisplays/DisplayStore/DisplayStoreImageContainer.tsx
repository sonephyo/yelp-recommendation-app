import Image from "next/image";
import React from "react";
const DisplayStoreImageContainer = () => {

  return (
    <div className=" flex flex-row gap-3">
      <button>
        <Image
          src={"/logo/arrow-store-information.svg"}
          alt="arrow"
          width={20}
          height={20}
          className={` p-[3px] border-2 rounded-full border-cButtonStrokeBlue  hover:border-cBlue transition `}
        />
      </button>
      {/* Displaying IMages */}
      <div className="relative w-[12rem] h-[12rem] bg-cButtonStrokeBlue rounded-[1rem] border-4 overflow-hidden">
        <Image
          src={"/test/test2.png"}
          alt="test image"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <button>
        <Image
          src={"/logo/arrow-store-information.svg"}
          alt="arrow"
          width={20}
          height={20}
          className={` p-[3px] border-2 rounded-full border-cButtonStrokeBlue  hover:border-cBlue transition rotate-180`}
        />
      </button>
    </div>
  );
};

export default DisplayStoreImageContainer;
