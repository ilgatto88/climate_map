import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../features/categorySlice";
import MapFooterItem from "./MapFooterItem";
import scenarios from "../data/categories.json";

import "../styles/MapFooter.css";

function MapFooter() {
  const category = useSelector((state) => state.categoryHandler.value);
  const dispatch = useDispatch();

  const categoryKeys = Object.keys(scenarios);

  return (
    <div className="map-footer">
      <div className="parameter-footer">
        {categoryKeys.map((categoryName) => (
          <MapFooterItem
            key={categoryName}
            categoryName={categoryName}
            expanded={category === categoryName}
            toggleCategory={() => dispatch(changeCategory(categoryName))}
          />
        ))}
      </div>
    </div>
  );
}

export default MapFooter;
