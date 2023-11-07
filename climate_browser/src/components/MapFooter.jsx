import React from "react";
import MapFooterItem from "./MapFooterItem";
import scenarios from "../data/categories.json";

import "../styles/MapFooter.css";

function MapFooter() {
  const categoryKeys = Object.keys(scenarios);

  return (
    <div className="map-footer">
      <div className="parameter-footer">
        {categoryKeys.map((categoryName) => (
          <MapFooterItem key={categoryName} categoryName={categoryName} />
        ))}
      </div>
    </div>
  );
}

export default MapFooter;
