import { indStoreInformationDataType } from "@/public/dataType/StoreInformationDataType";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchStore = ({ searchResult }: { searchResult: string }) => {
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
        console.log(res.data)
        setresultData(res.data);
      });
  }, [backend_url, searchResult]);

  return (
    <>
    <p>Result</p>
    {resultData && resultData.map((item : indStoreInformationDataType) => {
        <p>{item.name}</p>
    })}
    </>
  )
};

export default SearchStore;
