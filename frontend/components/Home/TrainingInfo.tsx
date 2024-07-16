import React from "react";
import Image from "next/image";
const TrainingInfo = () => {
  return (
    <div className="flex flex-col items-center my-10">
      <h2 className=" text-4xl font-bold italic mb-3 md:mb-10 text-center">
        Model Training Info
      </h2>
      <div className="flex flex-col md:flex-row ">
        <TrainingSet />
        <ConnectedSet />
        <TrainingIteration />
      </div>
    </div>
  );
};

const TrainingSet = () => {
  return (
    <div className="flex flex-col justify-center p-10 items-center">
      <div className=" w-20 translate-x-1 mb-5">
        <Image
          src="/svgs/trainingset.svg"
          alt="TrainingSets"
          width={500}
          height={500}
        />
      </div>
      <p className="text-3xl font-bold">200000</p>
      <p className="text-2xl font-semibold whitespace-nowrap">Training Sets</p>
    </div>
  );
};

const ConnectedSet = () => {
  return (
    <div className="flex flex-col justify-center p-10 items-center">
      <div className=" w-20 mb-5">
        <Image
          src="/svgs/iterations.svg"
          alt="TrainingSets"
          width={500}
          height={500}
        />
      </div>
      <p className="text-3xl font-bold">2000</p>
      <p className="text-2xl font-semibold whitespace-nowrap">Number of iterations</p>
    </div>
  );
};

const TrainingIteration = () => {
  return (
    <div className="flex flex-col justify-center p-10 items-center">
      <div className=" w-20 mb-5">
        <Image
          src="/svgs/connectedset.svg"
          alt="TrainingSets"
          width={500}
          height={500}
        />
      </div>
      <p className="text-3xl font-bold">17</p>
      <p className="text-2xl font-semibold whitespace-nowrap">Connected Sets</p>
    </div>
  );
};

export default TrainingInfo;
