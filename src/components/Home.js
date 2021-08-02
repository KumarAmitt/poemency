import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import {
  getRandomPoetries, loadMatchPoetry, random20, loadPoetryByAuthor,
} from '../store/poetry';
import Filter from './Filter';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(random20());
  }, []);

  const poetries = useSelector(getRandomPoetries);

  function handleChange(filter) {
    dispatch(loadMatchPoetry(filter));
  }
  function handleAuthor(filter) {
    dispatch(loadPoetryByAuthor(filter));
  }

  return (
    <>
      <Filter filterChange={handleChange} filterAuthor={handleAuthor} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Lines</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            poetries.map((p) => (
              <tr key={uniqid()}>
                <td>{p.title}</td>
                <td>{p.author}</td>
                <td>{p.linecount}</td>
                <td>
                  <Link to={`/poetry/${p.author}/${p.title}`}>Details</Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};

export default Home;
