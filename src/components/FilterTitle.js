import React, { useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getTitles, isTitleLoading, loadTitles } from '../store/slicers/title';
import Loading from './Loading';

const FilterTitle = ({ filterTitle }) => {
  const dispatch = useDispatch();
  const titles = useSelector(getTitles);
  const isTitlesLoading = useSelector(isTitleLoading);

  useEffect(() => {
    dispatch(loadTitles());
  }, []);

  return (
    <>
      {
        isTitlesLoading ? <Loading /> : (
          <Select
            options={titles.map((t) => ({ label: t, value: t }))}
            onChange={(e) => filterTitle(e.label)}
            placeholder="Select by Title"
          />
        )
      }
    </>
  );
};

FilterTitle.propTypes = {
  filterTitle: PropTypes.func.isRequired,
};

export default FilterTitle;
