import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { useDispatch } from 'react-redux';

import { loadPoetryByAuthor } from '../../../store/slicers/poetryHub';
import Loading from '../../../components/utilityComponent/Loading';
import '../../../stylesheets/shared/card.css';
import './style/FilterAuthor.css';

const FilterAuthor = ({
  filterAuthor, authorInfo,
}) => {
  const { authors, randomAuthors, isAuthorLoaded } = authorInfo;
  const dispatch = useDispatch();

  const handleClick = (author) => {
    dispatch(loadPoetryByAuthor(author));
  };

  return (
    <div className="card author-filter">
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
  authorInfo: PropTypes.instanceOf(Object).isRequired,
};

export default FilterAuthor;
