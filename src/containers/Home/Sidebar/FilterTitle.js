import React, { useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import { getTitles, isTitleLoading, loadTitles } from '../../../store/slicers/title';
import Loading from '../../../components/utilityComponent/Loading';
import { getAbsPoetry, loadPoetryByAbsTitle, loadPoetryHub } from '../../../store/slicers/poetryHub';
import '../../../stylesheets/shared/card.css';
import './style/FilterTitle.css';

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
    dispatch(loadPoetryHub());
  };

  return (
    <>
      <div className="card title-filter">
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
            isTitlesLoading ? <Loading /> : (
              poetry.map((p) => (
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
        </div>
      </div>
    </>
  );
};

export default FilterTitle;
