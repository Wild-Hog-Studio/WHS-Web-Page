import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./react-pages/Home";
import TCG from "./react-pages/TCG";

export default function Main() {
  return (
    <BrowserRouter>
      <Header /> {/* ⬅️ único */}
      <div className="bg-black">
        <div
          data-frame
          className="
            mx-auto min-h-screen
            max-w-[1440px]
            bg-[#121418]
            px-4 sm:px-6 lg:px-8
            shadow-[0_0_0_1px_rgba(255,255,255,0.06)]
          "
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/TCG/league" element={<TCG />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
