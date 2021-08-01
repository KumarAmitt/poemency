import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PoetryDetails = ({ match }) => {
  const { params: { title } } = match;

  return (
    <>
      <Link to="/" exact> Go back</Link>
      <h1>Details Page</h1>
      <h3>{title}</h3>
    </>
  );
};

PoetryDetails.propTypes = {
  match: PropTypes.string.isRequired,
};

export default PoetryDetails;
