import React from 'react';
import PropTypes from 'prop-types';

const PoetryCard = ({ title, author, lineCount }) => {
  const fixedLengthTitle = title.split('').slice(0, 20).join('');
  return (
    <>
      <div>
        <h3>{fixedLengthTitle}</h3>
        <h5>{author}</h5>
        <h6>{lineCount}</h6>
      </div>
    </>
  );
};

PoetryCard.prototype = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  lineCount: PropTypes.string.isRequired,
};

export default PoetryCard;
