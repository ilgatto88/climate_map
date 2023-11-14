/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeParameter } from "../features/variables/parameterSlice";
import { changeCategory } from "../features/categorySlice";

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

export default function MapFooterItem({ categoryName }) {
  const selectedCategory = useSelector((state) => state.categoryHandler.value);
  const dispatch = useDispatch();

  const handleClickOnCategory = () => {
    dispatch(changeCategory(categoryName));
  };

  return (
    <div className="parameter-footer-item">
      <div
        className="parameter-footer-item-icon"
        role="button"
        style={{ backgroundColor: CategoryData[categoryName].headerColor }}
        onClick={handleClickOnCategory}
        tabIndex={0}
      >
        <img
          className="category-svg"
          src={`/img/icons/${categoryName}.svg`}
          alt={categoryName}
        />
      </div>
      <div className="parameter-footer-item-title">
        {CategoryData[categoryName].name}
      </div>
      <ul
        className={`category-menu category-${categoryName} ${
          selectedCategory === categoryName ? "expanded" : ""
        }`}
      >
        <li
          className="category-header"
          style={{
            backgroundColor: CategoryData[categoryName].headerColor,
            color: "white",
          }}
          onClick={() => {
            dispatch(changeCategory(null));
          }}
        >
          <div className="category-title">
            <div className="category-text">
              {CategoryData[categoryName].name}
            </div>{" "}
            <div className="category-title-close">{"\u2BBD"}</div>
          </div>
        </li>
        {CategoryData[categoryName].items.map((item) => (
          <button
            type="button"
            onClick={() => {
              selectParameter(item);
              dispatch(changeParameter(item.name));
              dispatch(changeCategory(null));
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
};
