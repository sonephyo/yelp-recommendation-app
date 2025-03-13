export type BusinessTrainedDataType = {
    _id: string;
    businessId: string;
    name: string;
    latitude: number;
    longitude: number;
    neighboringBusiness: {
      [key: string]: number;
    };
  };
  