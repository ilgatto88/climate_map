import "leaflet/dist/leaflet.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hideInfo } from "../features/infoSlice";
import Card from "./Card";
import Legend from "./Legend";

import ScenarioData from "../data/scenarios.json";
import TimePeriodData from "../data/timeperiod.json";
import ParameterData from "../data/parameters.json";

import "../styles/Info.css";

function Info() {
  const infoState = useSelector((state) => state.infoHandler.value);

  const parameter = useSelector((state) => state.parameterHandler.value);
  const scenario = useSelector((state) => state.scenarioHandler.value);
  const futurePeriod = useSelector((state) => state.futurePeriodHandler.value);
  const dispatch = useDispatch();

  if (!infoState) {
    return null;
  }

  const handleHideInfo = () => {
    dispatch(hideInfo());
  };

  return (
    <div className="overlay-container">
      <div className="map-overlay">
        <div className="closeArea">
          <button type="button" onClick={handleHideInfo}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="overlay-left">
          <Card
            title="Emissions"
            subtitle={ScenarioData[scenario].primaryName}
            description={ScenarioData[scenario].description}
          />
          <Card
            title="Time Period"
            subtitle={TimePeriodData[futurePeriod].name}
            description={TimePeriodData[futurePeriod].description}
          />
          <Card
            title="Climate variable"
            subtitle={ParameterData[parameter].name}
            description={ParameterData[parameter].description}
          />
        </div>
        <div className="overlay-right">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Legend</div>
            </div>
            <div className="legend-container">
              <Legend parameter={parameter} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="card-title">Technical description</div>
              <img
                src={`/img/formulas/${parameter}.png`}
                className="formula"
                alt="Parameter formula"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
