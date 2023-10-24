/* eslint-disable react/no-danger */
import PropTypes from "prop-types";
import React from "react";
import DOMPurify from "dompurify";

import "../styles/Card.css";

function Card({ title, subtitle, description }) {
  const sanitizedDescription = DOMPurify.sanitize(description, {
    ADD_TAGS: ["a"],
    ADD_ATTR: ["href", "target"],
  });
  return (
    <div className="Card">
      <div className="Card-body">
        <div className="card-title">{title}</div>
        <div className="card-subtitle">{subtitle}</div>
        <div
          className="card-text"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
