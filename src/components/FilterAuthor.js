import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, loadAuthors } from '../store/slicers/author';

const FilterAuthor = ({ filterAuthor }) => {
  const dispatch = useDispatch();
  const authors = useSelector(getAuthors);

  useEffect(() => {
    dispatch(loadAuthors());
  }, []);

  return (
    <>
      <h1>Filter Author</h1>
      <select onChange={(e) => filterAuthor(e.target.value)}>
        <option selected disabled>--select by Author--</option>
        {
            authors.map((a) => (<option key={uniqid()} value={a}>{a}</option>))
          }
      </select>
    </>
  );
};

FilterAuthor.propTypes = {
  filterAuthor: PropTypes.func.isRequired,
};

export default FilterAuthor;
