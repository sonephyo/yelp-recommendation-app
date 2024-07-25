"use client";

import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
  useMap,
  useMarkerRef,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { DisplayType } from "@/public/enum/DisplayType";

type BusinessDataType = {
  name: string;
  businessId: string;
  latitude: string;
  longitude: string;
};

type BusinessDataState = {
  [key: string]: BusinessDataType;
};

const GoogleMap = ({
  setindStoreId,
  settypeOfStoreInformation,
  typeOfStoreInformation,
  indStoreId,
}: {
  setindStoreId: React.Dispatch<React.SetStateAction<string>>;
  settypeOfStoreInformation: React.Dispatch<React.SetStateAction<DisplayType>>;
  typeOfStoreInformation: DisplayType;
  indStoreId: string;
}) => {
  const map = useMap("main-map");
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL as string;
  const [businessData, setbusinessData] = useState<null | BusinessDataState>(
    null
  );
  const [isNonVisibleMarker, setisNonVisibleMarker] = useState<boolean>(false);

  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [selectedStore, setselectedStore] = useState<BusinessDataType | null>(
    null
  );
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
    axios
      .get(`${backend_url}/get-all-businesses`, { withCredentials: true })
      .then((res) => {
        setbusinessData(res.data);
      });
  }, [map, backend_url]);

  useEffect(() => {

    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  useEffect(() => {
    const ans = businessData
      ? (Object.keys(businessData) as (keyof typeof businessData)[]).filter(
          (businessId) => {
            // console.log(
            //   `${businessData[businessId]} and ${indStoreId} compare => ${
            //     businessId == indStoreId
            //   }`
            // );

            return businessData[businessId].businessId == indStoreId;
          }
        )
      : "";

    ans.length == 0 && indStoreId.length != 0
      ? setisNonVisibleMarker(true)
      : setisNonVisibleMarker(false);
  }, [indStoreId, businessData]);

  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {

    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  }, []);

  const handleClickMarker = useCallback(
    (ev: google.maps.MapMouseEvent, item: BusinessDataType) => {
      console.log("4 rerenders");

      if (!map || !ev.latLng) return;
      map.panTo(ev.latLng);
      setselectedStore(item);
    },
    [map]
  );

  const memorizedMarkers = useMemo(() => {
    return (
      businessData &&
      (Object.keys(businessData) as (keyof typeof businessData)[]).map(
        (businessId) => {
          let business = businessData[businessId];
          return (
            <div key={business.businessId}>
              <AdvancedMarker
                position={{
                  lat: +business.latitude,
                  lng: +business.longitude,
                }}
                key={business.businessId}
                ref={(marker) => {
                  setMarkerRef(marker, business.businessId);
                }}
                clickable={true}
                onClick={(ev) => {
                  handleClickMarker(ev, business);
                }}
              ></AdvancedMarker>
              {selectedStore &&
                selectedStore.businessId === business.businessId && (
                  <InfoWindow
                    position={{
                      lat: +business.latitude,
                      lng: +business.longitude,
                    }}
                    onClose={() => {
                      setselectedStore(null);
                      settypeOfStoreInformation(DisplayType.EXPLORE_STORE);
                    }}
                    className=" m-2 flex flex-col items-center "
                  >
                    <h2 className=" text-lg font-bold text-center">
                      {business.name}
                    </h2>
                    <button
                      className=" p-1 border-4 flex  rounded-full
 border-cButtonStrokeBlue bg-white hover:border-blue-300 transition"
                      onClick={() => {
                        setindStoreId(business.businessId);
                        settypeOfStoreInformation(DisplayType.DISPLAY_STORE);
                      }}
                    >
                      Explore Store
                    </button>
                  </InfoWindow>
                )}
            </div>
          );
        }
      )
    );
  }, [businessData, handleClickMarker, selectedStore, setMarkerRef]);

  const NonVisibleMarker = ({ indStoreId }: { indStoreId: string }) => {
    console.log(indStoreId)
    if (!indStoreId) {
      return;
    } else {
      
      return <p>{indStoreId}</p>;
    }
  };

  return (
    <Map
      style={{ width: "100vw", height: "90vh" }}
      defaultCenter={{ lat: 40.758, lng: -73.9855 }}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      defaultZoom={6}
      mapId={"main"}
      id="main-map"
      clickableIcons={false}
    >
      {memorizedMarkers}
      <NonVisibleMarker indStoreId={indStoreId} />
    </Map>
  );
};

export default React.memo(GoogleMap);
