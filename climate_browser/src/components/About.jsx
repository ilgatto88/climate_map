import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "./Card";

import { hideAbout } from "../features/aboutSlice";

import texts from "../data/texts.json";

const sections = Object.values(texts);

function About() {
  const aboutState = useSelector((state) => state.aboutHandler.value);

  const dispatch = useDispatch();
  if (!aboutState) {
    return null;
  }

  return (
    <div className="overlay-container">
      <div className="map-overlay">
        <div className="closeArea">
          <button
            type="button"
            onClick={() => {
              dispatch(hideAbout());
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="content">
          {sections.map((text) => (
            <Card
              title={text.name}
              subtitle=""
              description={text.description}
            />
          ))}
          <p className="rights">© 2023 All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default About;
