import React from "react";
import OffCanvasLineDiag from "./components/OffCanvasLineDiag";
import MapHeader from "./components/MapHeader";
import Map from "./components/MapContainer";
import MapFooter from "./components/MapFooter";

import "./styles/App.css";

function App() {
  return (
    <>
      <div className="app">
        <MapHeader />
        <Map />
        <MapFooter />
      </div>
      <OffCanvasLineDiag />
    </>
  );
}

export default App;
