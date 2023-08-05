import React, { useState } from "react";
import OffCanvasLineDiag from "./components/OffCanvasLineDiag";
import Map from "./components/MapContainer";

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
  const [showChart, setShowChart] = useState(false);

  const handleClose = () => setShowChart(DEFAULT_SHOW_CHART);

  const handleMunicipalityIdChange = (id) => {
    setMunicipalityId(id);
    setShowChart(true);
  };

  return (
    <>
      <Map onMunicipalityIdChange={handleMunicipalityIdChange} />
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
