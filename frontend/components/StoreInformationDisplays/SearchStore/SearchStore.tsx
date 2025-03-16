import { indStoreInformationDataType } from "@/public/dataType/StoreInformationDataType";
import { DisplayType } from "@/public/enum/DisplayType";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchStore = ({
  searchResult,
  setindStoreId,
  settypeOfStoreInformation,
}: {
  searchResult: string;
  setindStoreId: React.Dispatch<React.SetStateAction<string>>;
  settypeOfStoreInformation: React.Dispatch<React.SetStateAction<DisplayType>>;
}) => {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL as string;
  const [resultData, setresultData] = useState<
    indStoreInformationDataType[] | null
  >(null);

  useEffect(() => {
    axios
      .get(`${backend_url}/search-business`, {
        params: {
          keyword: searchResult,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setresultData(res.data);
      });
  }, [backend_url, searchResult]);

  return (
    <>
      {resultData &&
        resultData.map((item: indStoreInformationDataType, index: number) => (
          <IndStoreContainer item={item} key={index}>
            <button
              onClick={() => {
                setindStoreId(item.businessId);
                settypeOfStoreInformation(DisplayType.DISPLAY_STORE);
              }}
            >
              Explore Store
            </button>
          </IndStoreContainer>
        ))}
    </>
  );
};

export default SearchStore;

export const IndStoreContainer = ({
  item,
  children,
}: {
  item: indStoreInformationDataType;
  children: React.ReactNode;
}) => {
  return (
    <div className="border rounded-lg p-3 shadow-sm bg-white flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Business Name */}
      <p className="font-semibold text-sm md:text-base">{item.name}</p>

      {/* Location & Rating (Stacked on small screens, Inline on large screens) */}
      <div className="text-xs text-gray-600 flex flex-col md:flex-row md:items-center md:gap-3">
        <p>
          {item.address}, {item.city}, {item.state}
        </p>
        <p>
          ⭐ {item.stars} ({item.review_count} reviews)
        </p>
      </div>

      {/* Extra Details (Optional Children) */}
      {children}
    </div>
  );
};
