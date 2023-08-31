import React from "react";
import { useSelector } from "react-redux";
import "../styles/MapHeader.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScenarioData from "../data/scenarios.json";

function MapHeader() {
  const scenario = useSelector((state) => state.scenarioHandler.value);
  const futurePeriod = useSelector((state) => state.futurePeriodHandler.value);
  const parameterName = useSelector((state) => state.parameterHandler.value);

  return (
    <header className="map-header">
      <div className="header-parameter">{parameterName}</div>
      <div className="header-scenario-futureperiod">
        {ScenarioData[scenario].primaryName}{" "}
        <FontAwesomeIcon icon={faArrowRight} />{" "}
        {ScenarioData[scenario].secondaryName} <i className="spacer"> • </i>{" "}
        {futurePeriod}
      </div>
    </header>
  );
}

export default MapHeader;
