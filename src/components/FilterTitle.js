import React, { useEffect } from 'react';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getTitles, loadTitles } from '../store/slicers/title';

const FilterTitle = ({ filterTitle }) => {
  const dispatch = useDispatch();
  const titles = useSelector(getTitles);

  useEffect(() => {
    dispatch(loadTitles());
  }, []);

  return (
    <>
      <h1>Title Filter</h1>
      <select onChange={(e) => filterTitle(e.target.value)}>
        <option selected disabled>--select by Title--</option>
        {
            titles.map((t) => (<option key={uniqid()} value={t}>{t}</option>))
          }
      </select>
    </>
  );
};

FilterTitle.propTypes = {
  filterTitle: PropTypes.func.isRequired,
};

export default FilterTitle;
