import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import {
  loadPoetryHub, loadPoetryByAuthor, getPoetryHub, isPoetryHubLoading,
} from '../../store/slicers/poetryHub';
import Filter from './Sidebar/Filter';
import Loading from '../../components/utilityComponent/Loading';
import Error from '../../components/utilityComponent/Error';
import '../../stylesheets/shared/card.css';
import './style/Home.css';
import {
  getAuthors, getRandomAuthors, isAuthorLoading, loadAuthors,
} from '../../store/slicers/author';

const Home = () => {
  const dispatch = useDispatch();

  const authorInfo = {
    authors: useSelector(getAuthors),
    randomAuthors: useSelector(getRandomAuthors),
    isAuthorLoaded: useSelector(isAuthorLoading),
  };

  useEffect(() => {
    dispatch(loadPoetryHub());
    dispatch(loadAuthors());
  }, []);

  const poetries = useSelector(getPoetryHub);
  const isPoetriesLoading = useSelector(isPoetryHubLoading);

  const handleAuthorChange = (author) => {
    dispatch(loadPoetryByAuthor(author));
  };

  if (poetries.status === 404) {
    return <Error />;
  }

  return (
    <>
      <div className="home">
        <main>
          <div className="main-tiles">
            {
              isPoetriesLoading ? <Loading /> : (
                poetries.map((p) => (
                  <div key={uniqid()} className="card">
                    <div className="card-body">
                      <p>{p.author}</p>
                      <h3>{p.title.length > 77 ? `${p.title.substr(0, 73)}...` : p.title}</h3>
                    </div>
                    <div className="card-footer">
                      <Link to={`/poetry/${p.author}/${p.title}`} className="link">Read Poetry</Link>
                      <p className="lineCount">
                        Lines:
                        {' '}
                        {p.linecount}
                      </p>
                    </div>
                  </div>
                ))
              )
            }
          </div>

        </main>

        <Filter
          filterAuthor={handleAuthorChange}
          authorInfo={authorInfo}
        />
      </div>
    </>
  );
};

export default Home;
