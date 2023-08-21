import React from "react";
import { useQuery } from "react-query";

const OverallData = () => {
  const { data, error, isLoading } = useQuery("covidAllOverData", async () => {
    const response = await fetch("https://disease.sh/v3/covid-19/all");
    if (!response.ok) throw new Error("Network response failed!");
    return response.json();
  });

  if (isLoading) return <>Loading...</>;
  console.log("dataDet: ", data);

  if (error) return <>Error: {error.message}</>;

  return (
    <div>
      <>
        <div className="my-4 px-4">
          <div className="flex flex-wrap justify-between">
            {/* Record Cases */}
            <div className="w-full md:w-1/2 flex justify-between md:pr-3 lg:pr-4">
              <h6 className="capitalize text-md font-semibold">record cases</h6>
              <h6 className="text-md font-bold text-blue-600">
                {data.updated}
              </h6>
            </div>
            <div className="w-full md:w-1/2 flex justify-between md:pl-3 lg:pl-4">
              <h6 className="capitalize text-md font-semibold">total deaths</h6>
              <h6 className="text-md font-bold text-red-600">{data.deaths}</h6>
            </div>
          </div>

          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 flex justify-between md:pr-3 lg:pr-4">
              <h6 className="capitalize text-md font-semibold">
                total recovered:
              </h6>
              <h6 className="text-md font-bold text-green-600">
                {data.recovered}
              </h6>
            </div>
            <div className="w-full md:w-1/2 flex justify-between md:pl-3 lg:pl-4">
              <h6 className="capitalize text-md font-semibold">active cases</h6>
              <h6 className="text-md font-bold text-yellow-600">
                {data.active}
              </h6>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 flex justify-between md:pr-3 lg:pr-4">
              <h6 className="capitalize text-md font-semibold">
                critical cases
              </h6>
              <h6 className="text-md font-bold text-orange-600">
                {data.critical}
              </h6>
            </div>
            <div className="w-full md:w-1/2 flex justify-between md:pl-3 lg:pl-4">
              <h6 className="capitalize text-md font-semibold">record tests</h6>
              <h6 className="text-md font-bold text-blue-600">{data.tests}</h6>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 flex justify-between md:pr-3 lg:pr-4">
              <h6 className="capitalize text-md font-semibold">population</h6>
              <h6 className="text-md font-bold text-blue-600">
                {data.population}
              </h6>
            </div>
            <div className="w-full md:w-1/2 flex justify-between md:pl-3 lg:pl-4">
              <h6 className="capitalize text-md font-semibold">
                affected countries
              </h6>
              <h6 className="text-md font-bold text-orange-600">
                {data.affectedCountries}
              </h6>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default OverallData;
