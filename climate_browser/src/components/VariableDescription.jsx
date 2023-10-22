import PropTypes from "prop-types";
import React from "react";

import "../styles/VariableDescription.css";

function VariableDescription({ title, subtitle, description }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{title}</div>
        <div className="card-subtitle">{subtitle}</div>
        <div className="card-text">{description}</div>
      </div>
    </div>
  );
}

export default VariableDescription;

VariableDescription.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
