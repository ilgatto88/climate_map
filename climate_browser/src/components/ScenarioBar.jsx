import React from "react";
import { useDispatch } from "react-redux";
import "../styles/ScenarioBar.css";
import { activateButton } from "../utils/cosmetics";

import { changeScenario } from "../features/variables/scenarioSlice";
import { changeFuturePeriod } from "../features/variables/futurePeriodSlice";

function ScenarioBar() {
  const dispatch = useDispatch();
  return (
    <div className="scenario-timeline-bar">
      <div className="scenario-col">
        <div className="scenario-timeline-title">Climate Change</div>
        <div className="scenario-buttons">
          <button
            type="button"
            id="rcp26Button"
            className="scenario-timeline-buttons outline"
            onClick={() => {
              dispatch(changeScenario("rcp26"));
              activateButton("scenario-buttons", "rcp26Button");
            }}
          >
            Less
          </button>
          <button
            type="button"
            id="rcp85Button"
            className="scenario-timeline-buttons"
            onClick={() => {
              dispatch(changeScenario("rcp85"));
              activateButton("scenario-buttons", "rcp85Button");
            }}
          >
            More
          </button>
        </div>
      </div>
      <div className="timeline-col">
        <div className="scenario-timeline-title">Time Period</div>
        <div className="timeline-buttons">
          <button
            type="button"
            id="nearPast"
            className="scenario-timeline-buttons outline"
            onClick={() => {
              dispatch(changeFuturePeriod("1991-2020"));
              activateButton("timeline-buttons", "nearPast");
            }}
          >
            1991-2020
          </button>
          <button
            type="button"
            id="nearFuture"
            className="scenario-timeline-buttons"
            onClick={() => {
              dispatch(changeFuturePeriod("2036-2065"));
              activateButton("timeline-buttons", "nearFuture");
            }}
          >
            2036-2065
          </button>
          <button
            type="button"
            id="distantFuture"
            className="scenario-timeline-buttons outline"
            onClick={() => {
              dispatch(changeFuturePeriod("2071-2100"));
              activateButton("timeline-buttons", "distantFuture");
            }}
          >
            2071-2100
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScenarioBar;
