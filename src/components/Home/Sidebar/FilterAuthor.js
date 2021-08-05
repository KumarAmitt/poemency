import React, { useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuthors, getRandomAuthors, isAuthorLoading, loadAuthors,
} from '../../../store/slicers/author';
import { loadPoetryByAuthor } from '../../../store/slicers/poetryHub';
import Loading from '../../utilityComponent/Loading';
import '../../sharedCSS/card.css';
import './FilterAuthor.css';

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
    <div className="card">
      {
        isAuthorLoaded ? <Loading /> : (
          <div>
            <Select
              options={authors.map((a) => ({ label: a, value: a }))}
              onChange={(e) => filterAuthor(e.label)}
              placeholder="Select by Author"
            />
            <div className="button-container">
              {
              randomAuthors.map((a) => (
                <button
                  className="button"
                  type="button"
                  key={uniqid()}
                  onClick={() => handleClick(a)}
                >
                  {a}
                </button>
              ))
            }
            </div>
          </div>
        )
      }
    </div>
  );
};

FilterAuthor.propTypes = {
  filterAuthor: PropTypes.func.isRequired,
};

export default FilterAuthor;
