/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { changeParameter } from "../features/variables/parameterSlice";

import CategoryData from "../data/categories.json";
import ParameterData from "../data/parameters.json";

import "../styles/MapFooterItem.css";

function selectParameter(item) {
  document
    .querySelector(".category-menu-item.current")
    .classList.remove("current");
  document
    .querySelector(`.category-menu-item[data-value="${item.name}"]`)
    .classList.add("current");
}

function closeCategory(category) {
  if (category !== null) {
    document
      .querySelector(`.category-${category}`)
      .classList.remove("expanded");
  }
}

export default function MapFooterItem({
  categoryName,
  expanded,
  toggleCategory,
}) {
  const dispatch = useDispatch();
  const handleClickOnCategory = () => {
    toggleCategory(categoryName);
  };

  const handleItemClick = (item) => {
    selectParameter(item);
  };

  return (
    <div
      className="parameter-footer-item"
      role="button"
      onClick={handleClickOnCategory}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClickOnCategory();
        }
      }}
      tabIndex={0}
    >
      <div
        className="parameter-footer-item-icon"
        style={{ backgroundColor: CategoryData[categoryName].headerColor }}
      >
        <img
          className="category-svg"
          src={`/img/${categoryName}.svg`}
          alt={categoryName}
        />
      </div>
      <div className="parameter-footer-item-title">
        {CategoryData[categoryName].name}
      </div>
      <ul
        className={`category-menu category-${categoryName} ${
          expanded ? "expanded" : ""
        }`}
      >
        <li
          className="category-header"
          style={{
            backgroundColor: CategoryData[categoryName].headerColor,
            color: "white",
          }}
          onClick={() => closeCategory(categoryName)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === " ") {
              closeCategory(categoryName);
            }
          }}
        >
          {CategoryData[categoryName].name}{" "}
        </li>
        {CategoryData[categoryName].items.map((item) => (
          <button
            type="button"
            onClick={() => {
              selectParameter(item);
              dispatch(changeParameter(item.name));
              closeCategory(categoryName);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleItemClick(item);
              }
            }}
            key={`CategoryButton_${item.name}`}
          >
            <li
              data-value={item.name}
              key={item.name}
              className={`category-menu-item ${
                item.name === "tm" ? "current" : ""
              }`}
              title={ParameterData[item.name].description}
            >
              {item.title}
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}

MapFooterItem.propTypes = {
  categoryName: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggleCategory: PropTypes.func.isRequired,
};
