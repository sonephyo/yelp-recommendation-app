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
                "id": keysArray,
              },
              withCredentials: true,
            })
            .then((res) => {
              setsimilarStores(res.data);
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
      <h3 className="text-base">Stores most similar to This store</h3>
    </div>
  );
};

export default RecommendedStore;
