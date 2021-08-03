import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { getAuthors, loadAuthors } from '../store/poetry';
import { getTitles, loadTitles } from '../store/title';

const Filter = ({ filterChange, filterAuthor }) => {
  const dispatch = useDispatch();
  const titles = useSelector(getTitles);
  const authors = useSelector(getAuthors);

  useEffect(() => {
    dispatch(loadTitles());
  }, []);

  useEffect(() => {
    dispatch(loadAuthors());
  }, []);

  console.log(titles);

  return (
    <>
      <h1>Filter</h1>
      {/* <input */}
      {/*  type="text" */}
      {/*  list="title" */}
      {/*  placeholder="Select Title" */}
      {/* /> */}
      {/* <datalist id="title"> */}
      {/*  { */}
      {/*    titles.map((t) => (<option key={uniqid()} value={t}>{t}</option>)) */}
      {/*  } */}
      {/* </datalist> */}

      <select onChange={(e) => filterChange(e.target.value)}>
        <option selected="true" disabled="disabled">--select by Title--</option>
        {
          titles.map((t) => (<option key={uniqid()} value={t}>{t}</option>))
         }
      </select>

      <select onChange={(e) => filterAuthor(e.target.value)}>
        {
          authors.map((a) => (<option key={uniqid()} value={a}>{a}</option>))
        }
      </select>
      <hr />
    </>
  );
};

Filter.propTypes = {
  filterChange: PropTypes.func.isRequired,
  filterAuthor: PropTypes.func.isRequired,
};

export default Filter;
