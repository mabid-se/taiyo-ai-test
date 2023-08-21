import React from "react";
import MapStats from "../components/MapStats";
import { QueryClient, QueryClientProvider } from "react-query";
import CharStats from "../components/CharStats";

const ChartsAndMaps = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CharStats />
        <MapStats />
      </QueryClientProvider>
    </div>
  );
};

export default ChartsAndMaps;
