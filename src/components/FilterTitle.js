import React, { useEffect } from 'react';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getTitles, isTitleLoading, loadTitles } from '../store/slicers/title';

const FilterTitle = ({ filterTitle }) => {
  const dispatch = useDispatch();
  const titles = useSelector(getTitles);
  const isTitleLoaded = useSelector(isTitleLoading);

  useEffect(() => {
    dispatch(loadTitles());
  }, []);

  return (
    <>
      <h1>Title Filter</h1>
      {
        isTitleLoaded ? <h2>Loading...</h2> : (
          <select onChange={(e) => filterTitle(e.target.value)}>
            <option selected disabled>--select by Title--</option>
            {
            titles.map((t) => (<option key={uniqid()} value={t}>{t}</option>))
          }
          </select>
        )
      }
    </>
  );
};

FilterTitle.propTypes = {
  filterTitle: PropTypes.func.isRequired,
};

export default FilterTitle;
