import React from "react";
import { indStoreInformationDataType } from "@/public/dataType/StoreInformationDataType";
import Image from "next/image";
import DisplayStoreImageContainer from "./DisplayStoreImageContainer";
import DisplayStoreInformation from "./DisplayStoreInformation";
import RecommendedStore from "./RecommendedStore";

const DisplayStore = ({
  storeData,
}: {
  storeData: indStoreInformationDataType;
}) => {
  console.log("hi this is display store")
  return (
    <div className=" overflow-x-hidden overflow-y-auto flex flex-col items-center">
      <h2 className=" font-semibold text-lg mb-3 text-center">{storeData.name}</h2>
      <DisplayStoreImageContainer />

      <DisplayStoreInformation storeData={storeData}/>

      <RecommendedStore storeData={storeData}/>
      
    </div>
  );
};

export default DisplayStore;
