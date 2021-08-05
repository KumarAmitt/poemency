import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import {
  loadPoetryHub, loadPoetryByAuthor, getPoetryHub, isPoetryHubLoading,
} from '../store/slicers/poetryHub';
import Filter from './Filter';
import Loading from './utilityComponent/Loading';
import Error from './utilityComponent/Error';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPoetryHub());
  }, []);

  const poetries = useSelector(getPoetryHub);
  const isPoetriesLoading = useSelector(isPoetryHubLoading);

  function handleAuthorChange(author) {
    dispatch(loadPoetryByAuthor(author));
  }

  if (poetries.status === 404) {
    return <Error />;
  }

  return (
    <>
      <Filter filterAuthor={handleAuthorChange} />
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
