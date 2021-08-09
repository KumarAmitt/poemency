import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import { loadUniqPoetry, getUniqPoetry, istUniqPoetryLoading } from '../../store/slicers/uniqPoetry';
import { loadPoetryByAuthor, getPoetryHub, getIsSameAuthor } from '../../store/slicers/poetryHub';
import Loading from '../../components/utilityComponent/Loading';
import Error from '../../components/utilityComponent/Error';
import './style/PoetryDetails.css';
import '../../stylesheets/shared/card.css';

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

  const renderPoetry = (f) => {
    window.scrollTo(0, 0);
    dispatch(loadUniqPoetry(f.author, f.title));
  };

  if (feat.status === 404) {
    return <Error />;
  }

  return (
    <>
      <div className="poetry-container">
        {
          isPoemLoading ? <Loading /> : (
            <div className="poetry-card">
              <div className="poetry-card-header">
                <Link to="/">
                  <HomeIcon className="homeIcon" />
                </Link>
                <h2>{poem.title}</h2>
                <h4>
                  - by
                  {' '}
                  {poem.author}
                </h4>
                <p>
                  Length:
                  {' '}
                  {poem.lineCount}
                  {' '}
                  Lines
                </p>
              </div>
              <div className="poetry-card-body">
                {
                  poem.lines && poem.lines.map((p) => (p === '' ? <p className="empty-line" key={uniqid()} /> : <pre key={uniqid()}>{p}</pre>))
                }
              </div>
              <div />
            </div>
          )
        }
      </div>
      <div className="subheading">
        {
          isSameAuthor ? <h2>From the same Composer</h2> : <h2>Search suggestions</h2>
        }
      </div>
      <div className="suggestions">
        {
          feat.map((f) => (
            <div key={uniqid()} className="card">
              <div className="card-body">
                <p>{f.author}</p>
                <h3>{f.title}</h3>
              </div>
              <div className="card-footer">
                <Link to={`/poetry/${f.author}/${f.title}`} className="link" onClick={() => renderPoetry(f)}>Read</Link>
                <p className="lineCount">
                  Lines:
                  {f.linecount}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

PoetryDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PoetryDetails;
