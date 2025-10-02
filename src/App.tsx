import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Home from "./react-pages/Home";
import TCG from "./react-pages/TCG";
const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TCG/league" element={<TCG />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
