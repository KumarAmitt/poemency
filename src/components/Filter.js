import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { loadAuthors, getAuthors } from '../store/slicers/author';
import { loadTitles, getTitles } from '../store/slicers/title';

const Filter = ({ filterChange, filterAuthor }) => {
  const dispatch = useDispatch();
  const titles = useSelector(getTitles);
  const authors = useSelector(getAuthors);

  useEffect(() => {
    dispatch(loadTitles());
  }, []);

  useEffect(() => {
    dispatch(loadAuthors());
  }, []);

  return (
    <>
      <h1>Filter</h1>
      <select onChange={(e) => filterChange(e.target.value)}>
        <option selected disabled>--select by Title--</option>
        {
          titles.map((t) => (<option key={uniqid()} value={t}>{t}</option>))
         }
      </select>

      <select onChange={(e) => filterAuthor(e.target.value)}>
        <option selected disabled>--select by Author--</option>
        {
          authors.map((a) => (<option key={uniqid()} value={a}>{a}</option>))
        }
      </select>
      <hr />
    </>
  );
};

Filter.propTypes = {
  filterChange: PropTypes.func.isRequired,
  filterAuthor: PropTypes.func.isRequired,
};

export default Filter;
