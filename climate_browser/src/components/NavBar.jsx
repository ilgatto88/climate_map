/* eslint-disable jsx-a11y/anchor-is-valid */
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
    <nav className="navbar">
      <div className="menu">
        <div className="menu-btn" onClick={toggleMenu}>
          <div id="menu-title">MENU</div>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className={`menu-wrapper ${isMenuOpen ? "open" : ""}`}>
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
          <a
            className="menu-item"
            href="#"
            onClick={() => {
              toggleAbout();
            }}
          >
            About the Atlas
          </a>
        </div>
      </div>
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
      <div className="title">
        <div className="title-upper">{ParameterData[parameterName].name}</div>
        <div className="title-lower">
          <div className="title-scenario-primary">
            {ScenarioData[scenario].primaryName}
          </div>
          <div className="title-scenario-secondary">
            <FontAwesomeIcon icon={faArrowRight} />
            {ScenarioData[scenario].secondaryName}
          </div>{" "}
          <div className="title-future-period">
            {" "}
            <i className="spacer"> • </i> {futurePeriod}
          </div>
        </div>
      </div>
      <div className="spacer" />
    </nav>
  );
}

export default NavBar;
