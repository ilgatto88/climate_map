import PropTypes from "prop-types";
import React from "react";
import ParameterData from "../data/parameters.json";

import "../styles/Legend.css";

function Legend({ parameter }) {
  return (
    <div className="legend">
      <div className="legend-title">{ParameterData[parameter].unit}</div>
      <div className="legend-content">
        <span className="legend-min">
          {ParameterData[parameter].legend_min}
        </span>
        <span
          className="colorbar"
          style={{
            background: ParameterData[parameter].legend_colorbar,
          }}
        />
        <span className="legend-max">
          {ParameterData[parameter].legend_max}
        </span>
      </div>
    </div>
  );
}

export default Legend;

Legend.propTypes = {
  parameter: PropTypes.string.isRequired,
};
