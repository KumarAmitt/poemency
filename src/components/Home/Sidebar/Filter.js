import React from 'react';
import PropTypes from 'prop-types';
import FilterTitle from './FilterTitle';
import FilterAuthor from './FilterAuthor';

const Filter = ({ filterAuthor }) => (
  <>
    <h2>Filter</h2>
    <FilterTitle />
    <br />
    <br />
    <FilterAuthor filterAuthor={filterAuthor} />
    <hr />
  </>
);
Filter.propTypes = {
  filterAuthor: PropTypes.func.isRequired,
};

export default Filter;
