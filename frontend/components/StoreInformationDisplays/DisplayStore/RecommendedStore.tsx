import { BusinessTrainedDataType } from "@/public/dataType/BusinessTrainedDataType";
import { indStoreInformationDataType } from "@/public/dataType/StoreInformationDataType";
import axios from "axios";
import React, { useEffect, useState } from "react";
import qs from "qs";

const RecommendedStore = ({
  storeData,
}: {
  storeData: indStoreInformationDataType;
}) => {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

  const [similarStores, setsimilarStores] = useState<
    indStoreInformationDataType[]
  >([]);

  useEffect(() => {
    const fetchIndBusinessTrained = async (businessId: string) => {
      console.log("businessId: " + businessId);
      const singleBusinessInfo = await axios
        .get(`${backend_url}/get-trained-business`, {
          params: { businessId: businessId },
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return singleBusinessInfo;
    };

    const fetchSelectedBusiness = async (businessId: string) => {
      try {
        console.log("businessId: " + businessId);
        const response = await axios.get(`${backend_url}/get-business`, {
          params: { businessId: businessId },
          withCredentials: true,
        });
        return response.data;
      } catch (err) {
        console.error("Error fetching business data:", err);
        return null;
      }
    };

    if (storeData.businessId) {
      fetchIndBusinessTrained(storeData.businessId).then(
        async (res: BusinessTrainedDataType) => {
          const sortedEntries = Object.entries(res.neighboringBusiness).sort(
            ([, valueA], [, valueB]) => valueB - valueA
          );

          const keysArray = sortedEntries.map(([key]) => key);
          console.log(keysArray);
          axios
            .get(`${backend_url}/get-businesses-of-ids`, {
              params: {
                id: keysArray,
              },
              withCredentials: true,
            })
            .then((innerResponse) => {
              const storesWithSimilarity = innerResponse.data.map(
                (store: indStoreInformationDataType) => ({
                  ...store,
                  similarityScore:
                    res.neighboringBusiness[store.businessId] || 0, // Default to 0 if not found
                })
              );
              setsimilarStores(storesWithSimilarity);
            });
        }
      );
    }
  }, []);

  useEffect(() => {
    console.log(similarStores);
  }, [similarStores]);

  return (
    <div className=" ">
      <h3 className="text-xl md:text-3xl text-center">Top 20 stores similar to {storeData.name}</h3>
      {similarStores &&
        similarStores.map((data: indStoreInformationDataType, key: number) => (
          <div key={key} className="bg-white shadow-md rounded-lg p-6 my-4">
            <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
            <div className="flex flex-col lg:flex-row lg:space-x-6">
              <p className="text-gray-700 mb-2 lg:mb-0">{data.address}</p>
              <p className="text-gray-700 mb-2 lg:mb-0">{data.city}</p>
              <p className="text-gray-700 mb-2 lg:mb-0">{data.state}</p>
              <p className="text-gray-700 mb-2 lg:mb-0">
                Overall rating: {data.stars}
              </p>
              <p className="text-gray-700">Similarity Score: {data.similarityScore}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecommendedStore;
