import { storesLocation } from "@/public/testData/storesLocation";
import { AdvancedMarker, APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React from "react";

const MapTest = () => {
  const google_map_api_key = process.env
    .NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;
  return (
    <div className="absolute top-0">
        
    <APIProvider apiKey={google_map_api_key}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 40.758, lng: -73.9855 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        defaultZoom={12}
        mapId={"main"}
        className=""
      >
        {storesLocation.map((item) => {
          return (
            <AdvancedMarker
              position={{
                lat: +item.lat,
                lng: +item.long,
              }}
              key={item.id}
            />
          );
        })}
      </Map>
    </APIProvider>
    </div>

  );
};

export default MapTest;
