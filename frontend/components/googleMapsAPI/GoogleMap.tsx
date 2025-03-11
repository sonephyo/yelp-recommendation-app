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

  // Getting all the businesses
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
    console.log("1. Getting all businesses");
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

  // SetIsNonVisibleMarker
  useEffect(() => {
    console.log("2. Checking indStoreId and making it true or false");
    if (indStoreId.length != 0) {
      const ans = businessData
        ? (Object.keys(businessData) as (keyof typeof businessData)[]).filter(
            (businessId) => {
              return businessData[businessId].businessId == indStoreId;
            }
          )
        : "";
      setisNonVisibleMarker(true);

      ans.length == 0
        ? setisNonVisibleMarker(true)
        : setisNonVisibleMarker(false);
    }
  }, [indStoreId]);

  const setMarkerRef = useCallback(
    (marker: Marker | null, key: string) => {
      console.log("3.setting markers");
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
    },
    [markers]
  );

  const handleClickMarker = useCallback(
    (ev: google.maps.MapMouseEvent, item: BusinessDataType) => {
      console.log("4. Handling Clicks");
      if (!map || !ev.latLng) return;
      map.panTo(ev.latLng);
      map.setZoom(12);
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
            <div key={businessId}>
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
            </div>
          );
        }
      )
    );
  }, [businessData, handleClickMarker, setMarkerRef]);

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
        const business: BusinessDataType = {
          name: businessRaw.name,
          businessId: businessRaw.businessId,
          latitude: businessRaw.latitude.toString(),
          longitude: businessRaw.longitude.toString(),
        };
        setbusiness(business);
      });
    return <h1>Hi</h1>;
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
      {selectedStore && (
        <InfoWindow
          position={{
            lat: +selectedStore.latitude,
            lng: +selectedStore.longitude,
          }}
          onCloseClick={() => {
            setselectedStore(null);
            settypeOfStoreInformation(DisplayType.EXPLORE_STORE);
          }}
          className=" m-2 flex flex-col items-center "
        >
          <h2 className=" text-lg font-bold text-center">{selectedStore.name}</h2>
          <button
            className=" p-1 border-4 flex  rounded-full
 border-cButtonStrokeBlue bg-white hover:border-blue-300 transition"
            onClick={() => {
              setindStoreId(selectedStore.businessId);
              settypeOfStoreInformation(DisplayType.DISPLAY_STORE);
            }}
          >
            Explore Store
          </button>
        </InfoWindow>
      )}
      {isNonVisibleMarker ? (
        <NonVisibleMarker indStoreId={indStoreId} />
      ) : (
        <></>
      )}
    </Map>
  );
};

export default React.memo(GoogleMap);
