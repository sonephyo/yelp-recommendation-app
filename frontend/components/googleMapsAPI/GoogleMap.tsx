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
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Store } from "@/public/testData/storesData";
import axios from "axios";

type BusinessDataType = {
  name: string;
  id: string;
  latitude: string;
  longitude: string;
};

type BusinessDataState = {
  [key: string]: BusinessDataType;
};

const GoogleMap = () => {
  const map = useMap("main-map");
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL as string;
  const [businessData, setbusinessData] = useState<null | BusinessDataState>(
    null
  );

  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [selectedStore, setselectedStore] = useState<BusinessDataType | null>(
    null
  );
  const clusterer = useRef<MarkerClusterer | null>(null);
  

  useEffect(() => {
    console.log("1 rerenders");

    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
    axios.get(`${backend_url}getMap`, { withCredentials: true }).then((res) => {
      setbusinessData(res.data);
    });
  }, [map, backend_url]);

  useEffect(() => {
    console.log("2 rerenders");

    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = useCallback(
    (marker: Marker | null, key: string) => {
      console.log("3 rerenders");

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
    []
  );

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
    return businessData &&
    (Object.keys(businessData) as (keyof typeof businessData)[]).map(
      (businessId, index) => {
        let business = businessData[businessId];
        return (
          <div key={business.id}>
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
              }}
            ></AdvancedMarker>
            {selectedStore && selectedStore.id === business.id && (
              <InfoWindow
                position={{
                  lat: +business.latitude,
                  lng: +business.longitude,
                }}
                onClose={() => setselectedStore(null)}
                className=" m-2 flex flex-col items-center "
              >
                <h2 className=" text-lg font-bold">{business.name}</h2>
                <button
                  className=" p-1 border-4 flex  rounded-full
 border-cButtonStrokeBlue bg-white hover:border-blue-300 transition"
                >
                  Explore Store
                </button>
              </InfoWindow>
            )}
          </div>
        );
      }
    )
  }, [businessData, handleClickMarker, selectedStore, setMarkerRef])

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
    </Map>
  );
};

export default React.memo(GoogleMap);
