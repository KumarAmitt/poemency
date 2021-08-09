import React from 'react';
import PropTypes from 'prop-types';
import FilterTitle from './FilterTitle';
import FilterAuthor from './FilterAuthor';
import './style/Filter.css';

const Filter = ({ filterAuthor, authorInfo }) => (
  <div className="filter">
    <FilterAuthor
      filterAuthor={filterAuthor}
      authorInfo={authorInfo}
    />
    <FilterTitle />
  </div>
);
Filter.propTypes = {
  filterAuthor: PropTypes.func.isRequired,
  authorInfo: PropTypes.instanceOf(Object).isRequired,
};

export default Filter;
