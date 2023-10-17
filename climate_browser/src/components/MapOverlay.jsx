import "leaflet/dist/leaflet.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hide } from "../features/overlaySlice";
import VariableDescription from "./VariableDescription";
import Legend from "./Legend";

import ScenarioData from "../data/scenarios.json";
import TimePeriodData from "../data/timeperiod.json";
import ParameterData from "../data/parameters.json";

import "../styles/MapOverlay.css";

function MapOverlay() {
  const overlayState = useSelector(
    (state) => state.overlayVisibilityHandler.value
  );

  const parameter = useSelector((state) => state.parameterHandler.value);
  const scenario = useSelector((state) => state.scenarioHandler.value);
  const futurePeriod = useSelector((state) => state.futurePeriodHandler.value);

  const dispatch = useDispatch();
  if (!overlayState) {
    return null;
  }

  return (
    <div className="map-overlay">
      <div className="closeArea">
        <button
          type="button"
          onClick={() => {
            dispatch(hide());
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="variables">
        <VariableDescription
          title="Emissions"
          subtitle={ScenarioData[scenario].primaryName}
          description={ScenarioData[scenario].description}
        />
        <VariableDescription
          title="Time Period"
          subtitle={TimePeriodData[futurePeriod].name}
          description={TimePeriodData[futurePeriod].description}
        />
        <VariableDescription
          title="Climate variable"
          subtitle={ParameterData[parameter].name}
          description={ParameterData[parameter].description}
        />
        <div className="card">
          <div className="card-body">
            <div className="card-title">Legend</div>
          </div>
          <div className="legend-container">
            <Legend parameter={parameter} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapOverlay;
