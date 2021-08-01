import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTitles, loadTitles } from '../store/poetry';

const Filter = () => {
  const dispatch = useDispatch();
  const titles = useSelector(getTitles);

  useEffect(() => {
    dispatch(loadTitles());
  }, []);

  function filterChange(e) {
    console.log(e.target.value);
  }

  return (
    <>
      <h1>Filter</h1>
      <input type="text" list="title" onChange={filterChange} />
      <datalist id="title">
        {
          titles.map((t) => (<option key={t} value={t}>{t}</option>))
        }
      </datalist>
      <hr />
    </>
  );
};

export default Filter;
