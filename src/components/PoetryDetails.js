import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import { loadUniqPoetry, getUniqPoetry, istUniqPoetryLoading } from '../store/slicers/uniqPoetry';
import { loadPoetryByAuthor, getIsSameAuthor, getPoetryHub } from '../store/slicers/poetryHub';
import Loading from './Loading';

const PoetryDetails = ({ match }) => {
  const { params: { title, author } } = match;

  const dispatch = useDispatch();
  const poem = useSelector(getUniqPoetry);
  const isPoemLoading = useSelector(istUniqPoetryLoading);
  const feat = useSelector(getPoetryHub);
  const isSameAuthor = useSelector(getIsSameAuthor(author));

  useEffect(() => {
    dispatch(loadUniqPoetry(author, title));
  }, []);

  useEffect(() => {
    dispatch(loadPoetryByAuthor(author));
  }, []);

  function renderPoetry(f) {
    window.scrollTo(0, 0);
    dispatch(loadUniqPoetry(f.author, f.title));
  }

  return (
    <>
      <Link to="/"> Go back</Link>
      <h1>Details Page</h1>
      <hr />
      {
        isPoemLoading ? <Loading /> : (
          <div>
            <h3>{poem.title}</h3>
            <h5>{poem.author}</h5>
            <h6>{poem.lineCount}</h6>
            <div>
              {
              poem.lines && poem.lines.map((p) => (p === '' ? '---' : <pre key={uniqid()}>{p}</pre>))
            }
            </div>
          </div>
        )
      }

      <hr />
      {
        isSameAuthor ? <h2>From the same Composer</h2> : <h2>Search suggestions</h2>
      }
      {
       feat.map((f) => (
         <div key={uniqid()}>
           <p>{f.title}</p>
           <p>{f.author}</p>
           <p>{f.linecount}</p>
           <Link to={`/poetry/${f.author}/${f.title}`} onClick={() => renderPoetry(f)}>Details</Link>
           <hr />
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
