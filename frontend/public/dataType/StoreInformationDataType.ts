export type indStoreInformationDataType = {
  _id: string;
  businessId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  stars: number;
  review_count: number;
  is_open: number;
  attributes: {
    [key: string]: string;
  };
  categories: string;
  hours: {
    [key: string]: string;
  };
};
