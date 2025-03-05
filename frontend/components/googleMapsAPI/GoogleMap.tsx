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
import { indStoreInformationDataType } from "@/public/dataType/StoreInformationDataType";

type BusinessDataType = {
  name: string;
  id: string;
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
    console.log(indStoreId);
    if (indStoreId.length != 0) {
      const ans = businessData
        ? (Object.keys(businessData) as (keyof typeof businessData)[]).filter(
            (businessId) => {
              return businessData[businessId].id == indStoreId;
            }
          )
        : "";

      console.log(ans);
      setisNonVisibleMarker(true)

      ans.length == 0
        ? setisNonVisibleMarker(true)
        : setisNonVisibleMarker(false);
    }
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
  }, [markers]);

  const handleClickMarker = useCallback(
    (ev: google.maps.MapMouseEvent, item: BusinessDataType) => {
      console.log("4 rerenders");
      if (!map || !ev.latLng) return;
      map.panTo(ev.latLng);
      map.setZoom(12);
      setselectedStore(item);
    },
    [map]
  );

  const memorizedMarkers = () => {
    return (
      businessData &&
      (Object.keys(businessData) as (keyof typeof businessData)[]).map(
        (businessId) => {
          let business = businessData[businessId];
        
          return (
            <div key={businessId}>
              <AdvancedMarker
                position={{
                  lat: +business.latitude,
                  lng: +business.longitude,
                }}
                key={business.id}
                ref={(marker) => {
                  setMarkerRef(marker, business.id);
                }}
                clickable={true}
                onClick={(ev) => {
                  handleClickMarker(ev, business);
                  // console.log(business)
                }}
              ></AdvancedMarker>
              {selectedStore &&
                selectedStore.id === business.id && (
                  <InfoWindow
                    position={{
                      lat: +business.latitude,
                      lng: +business.longitude,
                    }}
                    onCloseClick={() => {
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
                        setindStoreId(business.id);
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
  };

  const NonVisibleMarker = ({ indStoreId }: { indStoreId: string }) => {
    const [business, setbusiness] = useState<BusinessDataType | null>(null);
    axios
      .get(`${backend_url}/get-business`, {
        params: {
          businessId: indStoreId,
        },
        withCredentials: true,
      })
      .then((res) => {
        const businessRaw: indStoreInformationDataType = res.data;
        console.log(businessRaw)
        const business: BusinessDataType = {
          name: businessRaw.name,
          id: businessRaw.businessId,
          latitude: businessRaw.latitude.toString(),
          longitude: businessRaw.longitude.toString(),
        };
        setbusiness(business);
      });
    return <h1>Hi</h1>
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
      {memorizedMarkers()}
      {isNonVisibleMarker ? (
        <NonVisibleMarker indStoreId={indStoreId} />
      ) : (
        <></>
      )}
    </Map>
  );
};

export default React.memo(GoogleMap);
