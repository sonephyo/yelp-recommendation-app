export type StoreLocation = {
  id: string;
  lat: string;
  long: string;
};

export const storesLocation: StoreLocation[] = [
  {
    id: "1",
    lat: "40.7580", // Times Square, NYC
    long: "-73.9855",
  },
  {
    id: "2",
    lat: "40.7128", // Manhattan, NYC
    long: "-74.0060",
  },
  {
    id: "3",
    lat: "40.7306", // Central Park, NYC
    long: "-73.9352",
  },
  {
    id: "4",
    lat: "40.7558", // Grand Central Terminal, NYC
    long: "-73.9860",
  },
  {
    id: "5",
    lat: "40.7488", // Empire State Building, NYC
    long: "-73.9857",
  },
];
