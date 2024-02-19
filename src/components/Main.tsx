/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { actions as dataActions } from '../slices/dataSlice';
import { getDataState } from '../utils/selectors';
import { apiRoutes } from '../utils/routes';

export const Main: React.FC = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { data } = useSelector(getDataState);
  const frontendVacancies = data.filter((item) => item.id === 3);
  const [vacancy] = frontendVacancies;

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(apiRoutes.vacancies());
      dispatch(dataActions.setData(response.data));
    };

    getData();
  }, []);

  return (
    <div className="main-page-container">
      <header>
        <div className="title">
          <h1>Хочешь работать над</h1>
          <h1>интересными проектами?</h1>
        </div>
      </header>
      <main>
        <p className="main-text">в команду Softorium требуются:</p>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="vacancy-info">
            <h4 className="vacancy-title">Frontend Developer</h4>
            <div className="main-stack">
              <span>Основной стек:</span>
              {vacancy?.main_technologies.map(({ name }) => (
                <div key={name} className="technology">
                  {name}
                </div>
              ))}
            </div>
            <div className="more-stack">
              <span>Будет плюсом, если владеете:</span>
              {vacancy?.more_technologies.map(({ name }) => (
                <div key={name} className="technology">
                  {name}
                </div>
              ))}
            </div>
            <button type="button" aria-label="more info">Подробнее</button>
          </div>
        ))}
      </main>
    </div>
  );
};
