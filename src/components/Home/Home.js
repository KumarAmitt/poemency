import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import {
  loadPoetryHub, loadPoetryByAuthor, getPoetryHub, isPoetryHubLoading,
} from '../../store/slicers/poetryHub';
import Filter from './Sidebar/Filter';
import Loading from '../utilityComponent/Loading';
import Error from '../utilityComponent/Error';
import '../sharedCSS/card.css';

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
      <div>
        <main>
          {
            isPoetriesLoading ? <Loading /> : (
              poetries.map((p) => (
                <div key={uniqid()} className="card">
                  <p>{p.author}</p>
                  <h3>{p.title.length > 50 ? `${p.title.substr(0, 46)}...` : p.title}</h3>
                  <div className="card-footer">
                    <Link to={`/poetry/${p.author}/${p.title}`} className="link">Read Poetry</Link>
                    <p className="lineCount">
                      Lines Count:
                      {p.linecount}
                    </p>
                  </div>
                </div>
              ))
            )
          }
        </main>

        <Filter filterAuthor={handleAuthorChange} />
      </div>
    </>
  );
};

export default Home;
