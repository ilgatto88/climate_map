import React from "react";
import PropTypes from "prop-types";
import "../styles/MapHeader.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScenarioData from "../data/scenarios.json";

function MapHeader({ parameter, scenario, futurePeriod }) {
  return (
    <header className="map-header">
      <div className="header-parameter">{parameter}</div>
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

MapHeader.propTypes = {
  parameter: PropTypes.string.isRequired,
  scenario: PropTypes.string.isRequired,
  futurePeriod: PropTypes.string.isRequired,
};
