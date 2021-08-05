import React, { useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import { getTitles, isTitleLoading, loadTitles } from '../../../store/slicers/title';
import Loading from '../../utilityComponent/Loading';
import { getAbsPoetry, loadPoetryByAbsTitle } from '../../../store/slicers/poetryHub';

const FilterTitle = () => {
  const dispatch = useDispatch();
  const titles = useSelector(getTitles);
  const isTitlesLoading = useSelector(isTitleLoading);

  const poetry = useSelector(getAbsPoetry);

  useEffect(() => {
    dispatch(loadTitles());
  }, []);

  const handleChange = (t) => {
    dispatch(loadPoetryByAbsTitle(t));
  };

  console.log(poetry);

  return (
    <>
      {
        isTitlesLoading ? <Loading /> : (
          <div>
            <Select
              options={titles.map((t) => ({ label: t, value: t }))}
              onChange={(e) => handleChange(e.value)}
              placeholder="Select by Title"
            />
          </div>
        )
      }
      <div>
        {
          poetry.map((p) => (
            <div key={uniqid()}>
              <h5>{p.title}</h5>
              <h6>{p.author}</h6>
              <h6>{p.linecount}</h6>
              <Link to={`/poetry/${p.author}/${p.title}`}>Details</Link>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default FilterTitle;
