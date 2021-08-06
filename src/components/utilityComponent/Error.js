import React from 'react';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import './Error.css';

const Error = () => (
  <div className="error">
    <button type="button" onClick={() => window.location.reload()}>
      <ArrowBackRoundedIcon color="secondary" fontSize="large" />
    </button>
    <h1>No such poetry available :(</h1>
  </div>
);

export default Error;
