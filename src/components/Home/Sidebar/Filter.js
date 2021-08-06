import React from 'react';
import PropTypes from 'prop-types';
import FilterTitle from './FilterTitle';
import FilterAuthor from './FilterAuthor';
import './style/Filter.css';

const Filter = ({ filterAuthor }) => (
  <div className="filter">
    <FilterAuthor filterAuthor={filterAuthor} />
    <FilterTitle />
  </div>
);
Filter.propTypes = {
  filterAuthor: PropTypes.func.isRequired,
};

export default Filter;
