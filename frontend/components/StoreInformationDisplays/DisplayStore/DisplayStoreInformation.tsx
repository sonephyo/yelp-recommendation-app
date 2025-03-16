import { indStoreInformationDataType } from "@/public/dataType/StoreInformationDataType";
import Image from "next/image";
import React, { useState } from "react";

type StoreDetailsProps = {
  storeData: {
    attributes?: { [key: string]: string };
    hours?: { [key: string]: string };
  };
};

const DisplayStoreInformation = ({
  storeData,
}: {
  storeData: indStoreInformationDataType;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg p-4 my-4">
      {/* Header */}
      <div className="mb-2 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{storeData.name}</h2>
        <p className="text-xs text-gray-500">
          Business ID: {storeData.businessId}
        </p>
      </div>

      {/* Address */}
      <div className="mb-2 text-center">
        <p className="text-sm text-gray-700">
          {storeData.address}, {storeData.city}, {storeData.state}{" "}
          {storeData.postal_code}
        </p>
        <p className="text-xs text-gray-500">
          Coordinates: {storeData.latitude}, {storeData.longitude}
        </p>
      </div>
      {/* Ratings and Reviews */}
      <div className="flex items-center justify-center mb-2">
        <StarReviews stars={storeData.stars} />
        <span className="ml-1 text-xs text-gray-600">
          ({storeData.review_count} reviews)
        </span>
      </div>

      {/* Categories & Attributes */}
      <div className="mb-2">
        <p className="text-xs font-medium text-gray-700 text-center">
          Categories:{" "}
          <span className="font-normal">{storeData.categories}</span>
        </p>
      </div>

      <StoreDetails storeData={storeData} />
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

const StoreDetails: React.FC<StoreDetailsProps> = ({ storeData }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setShowDetails((prev) => !prev)}
        className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-3 rounded flex mx-auto"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && (
        <div className="mt-2">
          {/* Attributes */}
          {storeData.attributes &&
            Object.keys(storeData.attributes).length > 0 && (
              <div className="mb-2 text-center">
                <p className="text-xl font-medium text-gray-700">Attributes</p>
                <div className="list-disc inline-block text-left">
                  {Object.entries(storeData.attributes).map(([key, value]) => (
                    <p key={key} className="text-xs text-gray-600">
                      <span className=" font-bold">{key}</span>: {value}
                    </p>
                  ))}
                </div>
              </div>
            )}

          {/* Hours */}
          {storeData.hours && Object.keys(storeData.hours).length > 0 && (
            <div className="mt-1 text-center">
              <p className="text-xl font-medium text-gray-700">Hours:</p>
              <ul className="list-disc inline-block text-left">
                {Object.entries(storeData.hours).map(([day, hours]) => (
                  <li key={day} className="text-xs text-gray-600">
                    {day}: {hours}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayStoreInformation;
