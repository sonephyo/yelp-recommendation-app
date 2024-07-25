import ConnectStoreButton from "@/components/customComponents/ConnectStoreButton";
import { indStoreInformationDataType } from "@/public/dataType/StoreInformationDataType";
import Image from "next/image";
import React from "react";

const DisplayStoreInformation = ({
  storeData,
}: {
  storeData: indStoreInformationDataType;
}) => {
  return (
    <div className=" text-sm flex flex-row gap-2 my-5">
      <div className="flex flex-col">
        <p>{storeData.address}</p>

        {/* Stars should be represented with custom stars */}
        <StarReviews stars={storeData.stars} />
      </div>
      <div className="flex flex-col justify-center">
        <ConnectStoreButton />
        <button className="text-[0.5rem] text-gray-500 hover:underline">What is connect store?</button>
        <button onClick={() => {

        }}>Show on map</button>
      </div>
    </div>
  );
};

const StarReviews = ({ stars = 0 }: { stars: number }) => {
  const numOfFillStars = Math.round(stars);
  const numOfEmptyStars = 5 - numOfFillStars;
  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-row">
        {Array.from({ length: numOfFillStars }).map((_, index) => (
          <Image
            key={index}
            src={"logo/star-fill.svg"}
            alt="star"
            width={10}
            height={10}
          />
        ))}
        {Array.from({ length: numOfEmptyStars }).map((_, index) => (
          <Image
            key={index}
            src={"logo/star-empty.svg"}
            alt="star"
            width={10}
            height={10}
          />
        ))}
      </div>
      <p>{stars}</p>
    </div>
  );
};

export default DisplayStoreInformation;
