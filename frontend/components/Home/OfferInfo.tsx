import React from "react";

const OfferInfo = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <h2 className=" text-4xl font-bold italic mb-10 ">What we offer</h2>
      <div>
          <div className="card bg-base-100 w-[80vw] max-w-80 shadow-xl shadow-cButtonShadowBlue">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <p className=" text-lg leading-5 font-semibold">Pick a store and we will recommend you the stores</p>
              <p></p>
              <div className="card-actions justify-center">
                <button className="btn">See Demo</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default OfferInfo;
