/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  faArrowRight,
  faBars,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ParameterData from "../data/parameters.json";
import ScenarioData from "../data/scenarios.json";
import "../styles/NavBar.css";
import { show } from "../features/overlaySlice";
import Legend from "./Legend";

function NavBar() {
  const scenario = useSelector((state) => state.scenarioHandler.value);
  const futurePeriod = useSelector((state) => state.futurePeriodHandler.value);
  const parameterName = useSelector((state) => state.parameterHandler.value);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-main">
      <nav
        role="navigation"
        className="menu"
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Space") {
            toggleMenu();
          }
        }}
      >
        <div title="Menu">
          <div>MENU</div>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className={`menu-wrapper ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <a className="menu-item" href="/">
              MAP
            </a>
            <a className="menu-item" href="http://127.0.0.1:8000/docs">
              API
            </a>
            <a className="menu-item" href="/about">
              ABOUT
            </a>
          </ul>
        </div>
      </nav>
      <div
        className="biginfo"
        onClick={() => {
          dispatch(show());
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Space") {
            toggleMenu();
          }
        }}
      >
        <div>INFO</div>
        <FontAwesomeIcon icon={faCircleInfo} />
      </div>
      <Legend parameter={parameterName} />
      <div className="mapinfo">
        <div className="parameter">{ParameterData[parameterName].name}</div>
        <div>
          {ScenarioData[scenario].primaryName}{" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
          {ScenarioData[scenario].secondaryName} <i className="spacer"> • </i>{" "}
          {futurePeriod}
        </div>
      </div>
      <div className="spacer" />
    </div>
  );
}

export default NavBar;
