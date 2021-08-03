import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRandomPoetries, loadPoetryByAuthor,
} from '../store/poetry';
import { loadUniqPoetry, getUniqPoetry } from '../store/uniqPoetry';

const PoetryDetails = ({ match }) => {
  const { params: { title, author } } = match;

  const dispatch = useDispatch();
  const poem = useSelector(getUniqPoetry);
  const feat = useSelector(getRandomPoetries);

  useEffect(() => {
    dispatch(loadUniqPoetry(author, title));
  }, []);

  useEffect(() => {
    dispatch(loadPoetryByAuthor(author));
  }, []);

  function renderPoetry(f) {
    window.scrollTo(0, 0);
    dispatch(loadUniqPoetry(f.author, f.title));
  }

  return (
    <>
      <Link to="/" exact> Go back</Link>
      <h1>Details Page</h1>
      <hr />
      <div>
        <h3>{poem.title}</h3>
        <h5>{poem.author}</h5>
        <h6>{poem.lineCount}</h6>
        <p>
          {
            poem.lines && poem.lines.map((p) => (p === '' ? '---' : <pre key={uniqid()}>{p}</pre>))
          }
        </p>
      </div>

      <hr />
      <h3>From the same Author</h3>
      {
        feat.map((f) => (
          <div key={f.title + f.author}>
            <p>{f.title}</p>
            <p>{f.author}</p>
            <p>{f.linecount}</p>
            <Link to={`/poetry/${f.author}/${f.title}`} onClick={() => renderPoetry(f)}>Details</Link>
            <hr />
          </div>
        ))
       }
    </>
  );
};

PoetryDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PoetryDetails;
