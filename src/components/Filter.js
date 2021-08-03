import React from 'react';
import PropTypes from 'prop-types';
import FilterTitle from './FilterTitle';
import FilterAuthor from './FilterAuthor';

const Filter = ({ filterTitle, filterAuthor }) => (
  <>
    <h1>Filter</h1>
    <FilterTitle filterTitle={filterTitle} />
    <FilterAuthor filterAuthor={filterAuthor} />
    <hr />
  </>
);

Filter.propTypes = {
  filterTitle: PropTypes.func.isRequired,
  filterAuthor: PropTypes.func.isRequired,
};

export default Filter;
