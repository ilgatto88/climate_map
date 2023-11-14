import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/ScenarioBar.css";
import { activateButton } from "../utils/cosmetics";

import { changeScenario } from "../features/variables/scenarioSlice";
import { changeFuturePeriod } from "../features/variables/futurePeriodSlice";

import SCENARIOS_JSON from "../data/scenarios.json";
import TIMEPERIOD_JSON from "../data/timeperiod.json";

const SCENARIOS = Object.keys(SCENARIOS_JSON).map((key) => SCENARIOS_JSON[key]);
const TIMEPERIODS = Object.keys(TIMEPERIOD_JSON).map(
  (key) => TIMEPERIOD_JSON[key]
);

function ScenarioBar() {
  const dispatch = useDispatch();

  const scenarioBarState = useSelector(
    (state) => state.scenarioBarHandler.value
  );

  const handleScenarioButtonClick = (scenario, buttonId) => {
    dispatch(changeScenario(scenario));
    activateButton("scenario-buttons", buttonId);
  };

  const handleFuturePeriodButtonClick = (period, periodName) => {
    dispatch(changeFuturePeriod(period));
    activateButton("timeperiod-buttons", periodName);
  };

  return (
    <div
      className={`scenario-timeperiod-bar-container ${
        scenarioBarState ? "visible" : ""
      }`}
    >
      <div className="scenario-timeperiod-bar">
        <div className="scenario-col">
          <div className="scenario-timeperiod-title">Climate Change</div>
          <div className="scenario-buttons">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                id={`${scenario.lowerCaseName}Button`}
                className={`scenario-timeperiod-buttons ${
                  scenario.buttonOutline ? "outline" : ""
                }`}
                onClick={() =>
                  handleScenarioButtonClick(
                    scenario.lowerCaseName,
                    `${scenario.lowerCaseName}Button`
                  )
                }
              >
                {scenario.buttonName}
              </button>
            ))}
          </div>
        </div>
        <div className="timeline-col">
          <div className="scenario-timeperiod-title">Time Period</div>
          <div className="timeperiod-buttons">
            {TIMEPERIODS.map((timeperiod) => (
              <button
                key={timeperiod.id}
                type="button"
                id={timeperiod.id}
                className={`scenario-timeperiod-buttons ${
                  timeperiod.buttonOutline ? "outline" : ""
                }`}
                onClick={() =>
                  handleFuturePeriodButtonClick(timeperiod.years, timeperiod.id)
                }
              >
                {timeperiod.years}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScenarioBar;
