import React from "react";
import { indStoreInformationDataType } from "@/public/dataType/StoreInformationDataType";
import Image from "next/image";

const DisplayStoreInformation = ({
  storeData,
}: {
  storeData: indStoreInformationDataType;
}) => {
  return (
    <div className=" overflow-x-hidden overflow-y-auto flex flex-col items-center">
      <h2 className=" font-semibold text-2xl mb-3">{storeData.name}</h2>
      <div className="w-[90vw] h-[15rem] bg-blue-400 rounded-[1rem] border-4 grid grid-cols-2 grid-rows-2">
        <div className=" row-span-2">
          <Image src="/test/test2.png" alt="" width={500} height={500}/>
        </div>
        <div className="">
          <Image src="/test/test2.png" alt="" width={500} height={500}/>

        </div>

        <div className="">
          <Image src="/test/test2.png" alt="" width={500} height={500}/>

        </div>
      </div>
    </div>
  );
};

export default DisplayStoreInformation;
