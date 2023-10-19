import PropTypes from "prop-types";
import React from "react";

import "../styles/ChangeValue.css";

export default function ChangeValue({ value, unit }) {
  return (
    <div className="value-change">
      <span>{value}</span>
      <span className="unit">{unit}</span>
    </div>
  );
}

ChangeValue.propTypes = {
  value: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};
