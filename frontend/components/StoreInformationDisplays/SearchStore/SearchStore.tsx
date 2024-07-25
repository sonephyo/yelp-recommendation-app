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

const IndStoreContainer = ({
  item,
  children,
}: {
  item: indStoreInformationDataType;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <p>{item.name}</p>
      {children}
    </div>
  );
};
