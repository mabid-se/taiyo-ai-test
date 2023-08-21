import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

const RoutesProvider = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" exact element={<DashboardLayout />} />
            <Route path="/home" exact element={<Navigate to="/" replace />} />
            <Route path="/chart-map" exact element={<DashboardLayout />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default RoutesProvider;
