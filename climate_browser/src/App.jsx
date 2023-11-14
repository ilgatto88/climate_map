import React from "react";
import OffCanvasLineDiag from "./components/OffCanvasLineDiag";
import NavBar from "./components/NavBar";
import Map from "./components/Map";
import MapFooter from "./components/MapFooter";
import Info from "./components/Info";
import About from "./components/About";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Info />
      <About />
      <div className="navbar-sidebar">
        <NavBar />
        <OffCanvasLineDiag />
      </div>
      <Map />
      <MapFooter />
    </div>
  );
}

export default App;
