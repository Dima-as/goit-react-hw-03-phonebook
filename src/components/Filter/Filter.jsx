import React from "react";
import s from "./Filter.module.scss";
import PropTypes from "prop-types";

const Filter = ({ value, onFilterInputValue }) => {
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.input}
        placeholder="Rosie Simpson"
        type="text"
        value={value}
        onChange={onFilterInputValue}
      />
    </label>
  );
};
Filter.propTypes = {
  value: PropTypes.string,
  onFilterInputValue: PropTypes.func.isRequired,
};
export default Filter;
