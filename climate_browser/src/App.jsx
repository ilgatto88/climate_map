import React, { useState } from "react";
import OffCanvasLineDiag from "./components/OffCanvasLineDiag";
import MapHeader from "./components/MapHeader";
import Map from "./components/MapContainer";
import MapFooter from "./components/MapFooter";

import "./styles/App.css";

const DEFAULT_MUNICIPALITY_ID = "10101";
const DEFAULT_SCENARIO = "rcp85";
const HISTORICAL_PERIOD = "1991-2020";
const FUTURE_PERIOD = "2036-2065";
const DEFAULT_PARAMETER = "Mean temperature [°C]";
const DEFAULT_SHOW_CHART = false;
const DEFAULT_HIDE_HISTORICAL_DATA = false;

function App() {
  const [municipalityId, setMunicipalityId] = useState(DEFAULT_MUNICIPALITY_ID);
  const [showChart, setShowChart] = useState(DEFAULT_SHOW_CHART);

  const handleClose = () => setShowChart(DEFAULT_SHOW_CHART);

  const handleMunicipalityIdChange = (id) => {
    setMunicipalityId(id);
    setShowChart(true);
  };

  return (
    <>
      <div className="app">
        <MapHeader
          parameter={DEFAULT_PARAMETER}
          scenario={DEFAULT_SCENARIO}
          futurePeriod={FUTURE_PERIOD}
        />
        <Map
          onMunicipalityIdChange={handleMunicipalityIdChange}
          showChart={showChart}
        />
        <MapFooter />
      </div>
      <OffCanvasLineDiag
        municipalityId={municipalityId}
        scenario={DEFAULT_SCENARIO}
        historicalPeriod={HISTORICAL_PERIOD}
        futurePeriod={FUTURE_PERIOD}
        parameter={DEFAULT_PARAMETER}
        showChart={showChart}
        handleClose={handleClose}
        hideHistoricalData={DEFAULT_HIDE_HISTORICAL_DATA}
      />
    </>
  );
}

export default App;
