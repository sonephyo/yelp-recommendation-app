import { indStoreInformationDataType } from "@/public/dataType/StoreInformationDataType";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IndStoreContainer } from "../SearchStore/SearchStore";
import { DisplayType } from "@/public/enum/DisplayType";

function ExploreStore({
  setindStoreId,
  settypeOfStoreInformation,
}: {
  setindStoreId: React.Dispatch<React.SetStateAction<string>>;
  settypeOfStoreInformation: React.Dispatch<React.SetStateAction<DisplayType>>;
}) {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL as string;
  const [resultData, setResultData] = useState<
    indStoreInformationDataType[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${backend_url}/get-random-businesses`, { withCredentials: true })
      .then((res) => {
        setResultData(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch data. Please try again.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-semibold text-center mb-4">Explore Stores</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {resultData &&
          resultData.map((store) => (
            <IndStoreContainer key={store.businessId} item={store}>
              <button
                onClick={() => {
                  setindStoreId(store.businessId);
                  settypeOfStoreInformation(DisplayType.DISPLAY_STORE);
                }}
              >
                Explore Store
              </button>
            </IndStoreContainer>
          ))}
      </div>
    </div>
  );
}

export default ExploreStore;
