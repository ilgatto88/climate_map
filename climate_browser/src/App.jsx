import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import ClimateData from "./components/ClimateData";
import Map from "./components/MapContainer";
import "./styles/App.css";

function App() {
  const [municipalityId, setMunicipalityId] = useState(10101);

  const handleMunicipalityIdChange = (id) => {
    setMunicipalityId(id);
  };

  return (
    <div className="content">
      <Map onMunicipalityIdChange={handleMunicipalityIdChange} />
      <div className="line-chart">
        <ClimateData municipalityId={municipalityId} scenario="rcp85" />
      </div>
    </div>
  );
}

export default App;
