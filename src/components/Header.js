import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadMatchPoetry } from '../store/poetry';

const Header = () => {
  const [title, setTitle] = useState();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loadMatchPoetry(title));
    console.log(title);
    setTitle('');
  };

  return (
    <>
      <h1>Poemency</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleChange} placeholder="keywords from title" />
      </form>
    </>
  );
};

export default Header;
