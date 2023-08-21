import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useQuery } from "react-query";
import "leaflet/dist/leaflet.css";
import locPinIco from "../assets/icons/location-50.png";
import L from "leaflet";

const MapStats = () => {
  const { data, error, isLoading } = useQuery("covidCountries", async () => {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    // countries = response; // setCountries(response);
    // console.log("countreis has: ", response);
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  });

  if (isLoading) return <>Loading...</>;

  if (error) return <>Error: {error.message}</>;

  const locIco = new L.icon({
    iconUrl: locPinIco,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <>
      <div className="flex justify-center align-center">
        <div className="w-10/12 my-8">
          <div className="w-full">
            <MapContainer
              center={[30.3753, 69.3451]}
              zoom={5}
              style={{ height: "80vh", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {data.map((country) => (
                <Marker
                  position={[country.countryInfo.lat, country.countryInfo.long]}
                  key={country.countryInfo._id}
                  icon={locIco}
                >
                  <Popup>
                    <div className="flex flex-wrap justify-start align-start py-2">
                      <img
                        src={country.countryInfo.flag}
                        style={{ width: "12%", height: "7%" }}
                      />
                      <h4 className="-mt-1 pl-3 font-semibold text-xl text-[#F0564F]">
                        {country.country}
                      </h4>
                    </div>

                    <h2 className="mb-3 text-lg font-semibold text-center">
                      Cases Summary
                    </h2>
                    <div className="flex flex-wrap flex-column">
                      {/* active cases */}
                      <div className="flex w-full justify-between gap-x-6">
                        <h6 className="capitalize text-md font-semibold">
                          active
                        </h6>
                        <h6 className="text-md font-bold text-yellow-600">
                          {country.active}
                        </h6>
                      </div>
                      {/* critical cases */}
                      <div className="mt-2 flex w-full justify-between gap-x-6">
                        <h6 className="capitalize text-md font-semibold">
                          critical
                        </h6>
                        <h6 className="text-md font-bold text-orange-600">
                          {country.critical}
                        </h6>
                      </div>
                      {/* total cases */}
                      <div className="mt-2 flex w-full justify-between gap-x-6">
                        <h6 className="capitalize text-md font-semibold">
                          total
                        </h6>
                        <h6 className="text-md font-bold text-blue-600">
                          {country.cases}
                        </h6>
                      </div>
                      {/* recovered cases */}
                      <div className="mt-2 flex w-full justify-between gap-x-6">
                        <h6 className="capitalize text-md font-semibold">
                          recovered
                        </h6>
                        <h6 className="text-md font-bold text-green-600">
                          {country.recovered}
                        </h6>
                      </div>
                      {/* deaths cases */}
                      <div className="mt-2 flex w-full justify-between gap-x-6">
                        <h6 className="capitalize text-md font-semibold">
                          deaths
                        </h6>
                        <h6 className="text-md font-bold text-red-600">
                          {country.deaths}
                        </h6>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapStats;
