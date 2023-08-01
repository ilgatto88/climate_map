import React from "react";
import PropTypes from "prop-types";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getNumberWithSign from "../utils/cosmetics";
import ScenarioData from "../data/scenarios.json";

export default function OffCanvasSubHeader({
  parameter,
  scenario,
  historicalPeriod,
  futurePeriod,
  historicalValue,
  ensembleValue,
  climateChangeValue,
  changeText,
}) {
  return (
    <div className="d-flex flex-column ms-3">
      <h3 className="text-main-name mb-0">Projected change in mean</h3>
      <h2 className="text-main-value mb-0">{parameter}</h2>
      <h4 className="text-scenario mt-0 mb-4">
        {ScenarioData[scenario].primaryName}{" "}
        <FontAwesomeIcon icon={faArrowRight} />{" "}
        {ScenarioData[scenario].secondaryName}
      </h4>
      <div className="location-data">
        <div className="value-historical">
          <div className="time-range text-scenario">{historicalPeriod}</div>
          <span className="value text-yellow">{historicalValue}</span>
          {changeText}
          <div className="value-change">
            {getNumberWithSign(climateChangeValue)}
          </div>
        </div>
        <div className="value-ensemble">
          <div className="time-range text-scenario">{futurePeriod}</div>
          <span className="text-white">
            <FontAwesomeIcon icon={faArrowRight} />{" "}
          </span>
          <span className="value text-yellow">{ensembleValue}</span>
        </div>
      </div>
    </div>
  );
}

OffCanvasSubHeader.propTypes = {
  parameter: PropTypes.string.isRequired,
  scenario: PropTypes.string.isRequired,
  historicalPeriod: PropTypes.string.isRequired,
  futurePeriod: PropTypes.string.isRequired,
  historicalValue: PropTypes.string.isRequired,
  ensembleValue: PropTypes.string.isRequired,
  climateChangeValue: PropTypes.string.isRequired,
  changeText: PropTypes.node.isRequired,
};
