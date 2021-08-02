import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRandomPoetries, getSinglePoetries, loadPoetryByAuthor, loadSinglePoetry,
} from '../store/poetry';

const PoetryDetails = ({ match }) => {
  const { params: { title, author } } = match;

  const dispatch = useDispatch();
  const poem = useSelector(getSinglePoetries);
  const feat = useSelector(getRandomPoetries);

  useEffect(() => {
    dispatch(loadSinglePoetry(title, author));
  }, []);

  useEffect(() => {
    dispatch(loadPoetryByAuthor(author));
  }, []);

  const [poetry, setPoetry] = useState(poem);

  function renderPoetry(f) {
    setPoetry({
      title: f.title,
      author: f.author,
      lines: f.lines,
      lineCount: f.linecount,
    });
  }

  console.log(poetry);

  return (
    <>
      <Link to="/" exact> Go back</Link>
      <h1>Details Page</h1>
      <hr />
      <div>
        <h3>{poetry.title || poem.title}</h3>
        <h5>{poetry.author || poem.author}</h5>
        <h6>{poetry.lineCount || poem.lineCount}</h6>
        <p>
          {
            (poetry.lines || poem.lines).map((p) => (p === '' ? '---' : <pre key={uniqid()}>{p}</pre>))
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
