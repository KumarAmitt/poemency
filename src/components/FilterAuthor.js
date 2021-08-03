import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuthors, getRandomAuthors, isAuthorLoading, loadAuthors,
} from '../store/slicers/author';
import { loadPoetryByAuthor } from '../store/slicers/poetryHub';

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

  console.log(randomAuthors);

  return (
    <>
      <h1>Filter Author</h1>
      {
        isAuthorLoaded ? <h2>Author Loading ...</h2> : (
          <div>
            <select onChange={(e) => filterAuthor(e.target.value)}>
              <option selected disabled>--select by Author--</option>
              {
              authors.map((a) => (<option key={uniqid()} value={a}>{a}</option>))
            }
            </select>
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
