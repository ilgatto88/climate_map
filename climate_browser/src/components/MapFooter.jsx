import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  faCircleChevronUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MapFooterItem from "./MapFooterItem";
import { showScenarioBar, hideScenarioBar } from "../features/scenarioBarSlice";
import scenarios from "../data/categories.json";

import ScenarioBar from "./ScenarioBar";

import "../styles/MapFooter.css";

function MapFooter() {
  const dispatch = useDispatch();
  const categoryKeys = Object.keys(scenarios);
  const scenarioBarState = useSelector(
    (state) => state.scenarioBarHandler.value
  );

  return (
    <>
      <div className="mobile-menubar-container">
        <div className="mobile-menubar">
          <FontAwesomeIcon
            icon={scenarioBarState ? faCircleChevronDown : faCircleChevronUp}
            onClick={() => {
              if (scenarioBarState) {
                dispatch(hideScenarioBar());
              } else {
                dispatch(showScenarioBar());
              }
            }}
          />
        </div>
        <ScenarioBar />
      </div>
      <div className="map-footer">
        <div className="parameter-footer">
          {categoryKeys.map((categoryName) => (
            <MapFooterItem key={categoryName} categoryName={categoryName} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MapFooter;
