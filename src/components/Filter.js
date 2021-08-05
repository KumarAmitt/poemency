import React from 'react';
import PropTypes from 'prop-types';
import FilterTitle from './FilterTitle';
import FilterAuthor from './FilterAuthor';

const Filter = ({ filterTitle, filterAuthor }) => (
  <>
    <h2>Filter</h2>
    <FilterTitle filterTitle={filterTitle} />
    <br />
    <br />
    <FilterAuthor filterAuthor={filterAuthor} />
    <hr />
  </>
);

Filter.propTypes = {
  filterTitle: PropTypes.func.isRequired,
  filterAuthor: PropTypes.func.isRequired,
};

export default Filter;
