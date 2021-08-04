import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import {
  loadPoetryHub, loadPoetryByAuthor, loadPoetryByTitle, getPoetryHub, isPoetryHubLoading,
} from '../store/slicers/poetryHub';
import Filter from './Filter';
import Loading from './Loading';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPoetryHub());
  }, []);

  const poetries = useSelector(getPoetryHub);
  const isPoetriesLoading = useSelector(isPoetryHubLoading);

  function handleTitleChange(filter) {
    dispatch(loadPoetryByTitle(filter));
  }

  function handleAuthorChange(filter) {
    dispatch(loadPoetryByAuthor(filter));
  }

  return (
    <>
      <Filter filterTitle={handleTitleChange} filterAuthor={handleAuthorChange} />
      {
        isPoetriesLoading ? <Loading /> : (
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
        )
      }
    </>
  );
};

export default Home;
