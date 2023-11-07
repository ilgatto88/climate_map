import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hideAbout } from "../features/aboutSlice";
import Card from "./Card";
import texts from "../data/texts.json";

function About() {
  const aboutState = useSelector((state) => state.aboutHandler.value);
  const dispatch = useDispatch();
  const sections = Object.values(texts);

  if (!aboutState) {
    return null;
  }

  const closeAbout = () => {
    dispatch(hideAbout());
  };

  return (
    <div className="overlay-container">
      <div className="map-overlay">
        <div className="closeArea">
          <button type="button" onClick={closeAbout}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="content">
          {sections.map((text) => (
            <Card
              key={text.name}
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
