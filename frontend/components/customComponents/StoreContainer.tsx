// This component is used in Store Information

import Image from "next/image";
import React from "react";

type Store = {
  id: string;
  name: string;
  address: string;
  rating: number;
};

const StoreContainer = ({ store }: { store: Store }) => {
  return (
    <div className="flex flex-row gap-5">
      <div className=" w-[10rem] h-[10rem]">
        <Image
          src="https://img.freepik.com/premium-photo/duty-free-dubai-international-airport_78361-14261.jpg?w=2000"
          alt={store.name}
          height={200}
          width={200}
          style={{objectFit:"cover"}}
        />
      </div>
      <div className="flex flex-col  items-start text-sm">
        <p>{store.name}</p>
        <p>{store.address}</p>
        <p>{store.rating}</p>
      </div>
    </div>
  );
};

export default StoreContainer;
