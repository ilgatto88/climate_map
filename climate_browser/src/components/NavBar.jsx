/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import { showInfo } from "../features/infoSlice";
import { showAbout } from "../features/aboutSlice";
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

  const toggleAbout = () => {
    dispatch(showAbout());
    toggleMenu();
  };

  return (
    <div className="navbar-main">
      <nav role="navigation" className="menu" onClick={toggleMenu}>
        <div title="Menu">
          <div id="menu-title">MENU</div>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className={`menu-wrapper ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <a
              className="menu-item"
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noreferrer"
            >
              ClimATe API
            </a>
            <a className="menu-item" href="/" target="_blank" rel="noreferrer">
              ClimATe Atlas
            </a>
            <div
              className="menu-item"
              onClick={() => {
                toggleAbout();
              }}
            >
              About the Atlas
            </div>
          </ul>
        </div>
      </nav>
      <div
        className="biginfo"
        onClick={() => {
          dispatch(showInfo());
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
