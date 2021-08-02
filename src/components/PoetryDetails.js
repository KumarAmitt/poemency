import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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

  return (
    <>
      <Link to="/" exact> Go back</Link>
      <h1>Details Page</h1>
      <h3>{title}</h3>
      <hr />
      {
        poem.map((p) => (
          <div key={p.title}>
            <h3>{p.title}</h3>
            <h6>{p.author}</h6>
            <p>{p.lines}</p>
          </div>
        ))
       }

      <hr />
      <h3>From the same Author</h3>
      {
        feat.map((f) => (
          <div key={f.title + f.author}>
            <p>{f.title}</p>
            <p>{f.author}</p>
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
