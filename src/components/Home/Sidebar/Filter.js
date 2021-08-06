import React from 'react';
import PropTypes from 'prop-types';
import FilterTitle from './FilterTitle';
import FilterAuthor from './FilterAuthor';
import './Filter.css';

const Filter = ({ filterAuthor }) => (
  <div className="filter">
    <FilterTitle />
    <FilterAuthor filterAuthor={filterAuthor} />
  </div>
);
Filter.propTypes = {
  filterAuthor: PropTypes.func.isRequired,
};

export default Filter;
