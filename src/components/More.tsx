import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { getDataState } from '../utils/selectors';
import { apiRoutes } from '../utils/routes';
import { actions as dataActions } from '../slices/dataSlice';
import image1 from '../assets/images/image-1.jpeg';
import image2 from '../assets/images/image-2.jpeg';
import image3 from '../assets/images/image-3.jpeg';
import image4 from '../assets/images/image-4.png';

export const More: React.FC = () => {
  const dispatch = useDispatch();
  const { currentVacancyInfo } = useSelector(getDataState);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(apiRoutes.frontendVacancy());
      dispatch(dataActions.setCurrentVacancyInfo(response.data));
    };

    getData();
  }, [dispatch]);

  return (
    <div className="more-page-container">
      <div className="more-title">
        <h1>Ищем Frontend Developer’а</h1>
        <h2>Трудоустройство в аккредитованную ИТ-компанию</h2>
      </div>
      <div className="item-1">
        <p>Мы любим сложные, интересные проекты,
          постоянно расширяемся и именно поэтому
          ищем новые таланты. В коллективе Softorium
          вы найдете возможность воплотить идеи
          любого уровня нестандартности и вместе с
          тем перенять опыт наших ведущих
          разработчиков.
        </p>
        <img src={image1} alt="1" className='image' />
      </div>
      <div className="item-2">
        <img src={image2} alt="2" className='image' />
        <div className="requirements">
          <h4>Необходимый минимум:</h4>
          {currentVacancyInfo?.min_requirements.map(({ name }) => (
            <div key={name} className="requirement">
              {name}
            </div>
          ))}
          <h4>Преимуществом будет знание:</h4>
          <div className="more-stack">
            {currentVacancyInfo?.more_technologies.map(({ name }) => (
              <div key={name} className="technology">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="item-3">
        <div className="tasks">
          <h4>Чем предстоит заниматься:</h4>
          {currentVacancyInfo?.tasks.map(({ name }) => (
            <div key={name} className="task">
              {name}
            </div>
          ))}
        </div>
        <img src={image3} alt="3" className='image' />
      </div>
      <div className="item-4">
        <img src={image4} alt="4" className='image' />
        <div className="list-offer">
          <h4>Со своей стороны мы готовы предложить:</h4>
          {currentVacancyInfo?.list_offer.map(({ name }) => (
            <div key={name} className="offer-item">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
