import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePoetries, loadSinglePoetry } from '../store/poetry';

const PoetryDetails = ({ match }) => {
  const { params: { title } } = match;

  const dispatch = useDispatch();
  const poem = useSelector(getSinglePoetries);

  useEffect(() => {
    dispatch(loadSinglePoetry(title));
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
    </>
  );
};

PoetryDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PoetryDetails;
