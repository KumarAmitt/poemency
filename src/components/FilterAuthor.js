import React, { useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuthors, getRandomAuthors, isAuthorLoading, loadAuthors,
} from '../store/slicers/author';
import { loadPoetryByAuthor } from '../store/slicers/poetryHub';
import Loading from './Loading';

const FilterAuthor = ({ filterAuthor }) => {
  const dispatch = useDispatch();
  const authors = useSelector(getAuthors);
  const randomAuthors = useSelector(getRandomAuthors);
  const isAuthorLoaded = useSelector(isAuthorLoading);

  useEffect(() => {
    dispatch(loadAuthors());
  }, []);

  const handleClick = (author) => {
    dispatch(loadPoetryByAuthor(author));
  };

  return (
    <>
      {
        isAuthorLoaded ? <Loading /> : (
          <div>
            <Select
              options={authors.map((a) => ({ label: a, value: a }))}
              onChange={(e) => filterAuthor(e.label)}
              placeholder="Select by Author"
            />
            <div>
              {
              randomAuthors.map((a) => (<button type="button" key={uniqid()} onClick={() => handleClick(a)}>{a}</button>))
            }
            </div>
          </div>
        )
      }
    </>
  );
};

FilterAuthor.propTypes = {
  filterAuthor: PropTypes.func.isRequired,
};

export default FilterAuthor;
