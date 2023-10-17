import React from "react";
import OffCanvasLineDiag from "./components/OffCanvasLineDiag";
import NavBar from "./components/MapHeader";
import Map from "./components/Map";
import MapFooter from "./components/MapFooter";
import MapOverlay from "./components/MapOverlay";

import "./styles/App.css";
import ScenarioBar from "./components/ScenarioBar";

function App() {
  return (
    <>
      <div className="app">
        <MapOverlay />
        <NavBar />
        <Map />
        <ScenarioBar />
        <MapFooter />
      </div>
      <OffCanvasLineDiag />
    </>
  );
}

export default App;
