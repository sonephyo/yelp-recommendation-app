import { storesLocation } from "@/public/testData/storesLocation";
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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Store } from "@/public/testData/storesData";

const GoogleMap = () => {
  const map = useMap("main-map");

  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  const [selectedTreeKey, setselectedTreeKey] = useState<string>("");

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
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
  };

  const handleClickMarker = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!ev.latLng) return;
      map.panTo(ev.latLng);
    },
    [map]
  );

  // For Info Window
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);

  // clicking the marker will toggle the infowindow
  const handleClickInfoWindow = useCallback(
    (itemKey: string) => {
      setInfoWindowShown((isShown) => !isShown);
      setselectedTreeKey(itemKey);
      console.log(selectedTreeKey);
    },
    [selectedTreeKey]
  );

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  // const handleClickCombined = useCallback(
  //   (ev: google.maps.MapMouseEvent) =>  {
  //     handleClickMarker(ev);
  //     handleClickInfoWindow("5");
  //   },
  //   [handleClickMarker, handleClickInfoWindow] // Dependencies
  // );

  const handleClickCombined = useCallback(
    (id: string) => {
      setInfoWindowShown((isShown) => !isShown);
      setselectedTreeKey(id);
    },
    [] // Dependencies
  );

  return (
    <Map
      style={{ width: "100vw", height: "90vh" }}
      defaultCenter={{ lat: 40.758, lng: -73.9855 }}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      defaultZoom={12}
      mapId={"main"}
      id="main-map"
    >
      {storesLocation.map((item) => {
        return (
          <>
            <AdvancedMarker
              position={{
                lat: +item.lat,
                lng: +item.long,
              }}
              key={item.id}
              ref={(el) => {
                setMarkerRef(marker, item.id);
                markerRef(el);
              }}
              clickable={true}
              onClick={() => {
                handleClickCombined(item.id);
              }}
            ></AdvancedMarker>
          </>
        );
      })}
    </Map>
  );
};

export default GoogleMap;
