import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { getDataState } from '../utils/selectors';
import { apiRoutes } from '../utils/routes';
import { actions as dataActions } from '../slices/dataSlice';
import type { CurrentVacancyInfo, NamedEntity } from '../types/interfaces';
import image1 from '../assets/images/image-1.jpeg';
import image2 from '../assets/images/image-2.jpeg';
import image3 from '../assets/images/image-3.jpeg';
import image4 from '../assets/images/image-4.png';

interface AddInfoProps {
  currentVacancyInfo: CurrentVacancyInfo | null;
  keyProp: keyof CurrentVacancyInfo ;
}

const infoEntities: { [key: string]: () => keyof CurrentVacancyInfo } = {
  more_technologies: () => 'more_technologies',
  min_requirements: () => 'min_requirements',
  list_offer: () => 'list_offer',
  tasks: () => 'tasks',
};

const AddInfo: React.FC<AddInfoProps> = ({ currentVacancyInfo, keyProp }) => {
  const { t } = useTranslation();

  if (!currentVacancyInfo) return null;
  const items = currentVacancyInfo[keyProp] as NamedEntity[];

  return (
    <>
      <h4>{t(`more.title.${keyProp}`)}</h4>
      {items.map(({ name }: NamedEntity) => (
        <div key={name} className={keyProp}>
          {name}
        </div>
      ))}
    </>
  );
};

export const More: React.FC = () => {
  const { t } = useTranslation();
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
        <h1>{t('more.title.1')}</h1>
        <h2>{t('more.title.2')}</h2>
      </div>
      <div className="item-1">
        <p>{t('more.text')}</p>
        <img src={image1} alt="1" className='image' />
      </div>
      <div className="item-2">
        <img src={image2} alt="2" className='image' />
        <div className="requirements">
          <AddInfo
            currentVacancyInfo={currentVacancyInfo}
            keyProp={infoEntities.min_requirements()}
          />
          <div className="more-stack">
            <AddInfo
              currentVacancyInfo={currentVacancyInfo}
              keyProp={infoEntities.more_technologies()}
            />
          </div>
        </div>
      </div>
      <div className="item-3">
        <div className="tasks">
          <AddInfo
            currentVacancyInfo={currentVacancyInfo}
            keyProp={infoEntities.tasks()}
          />
        </div>
        <img src={image3} alt="3" className='image' />
      </div>
      <div className="item-4">
        <img src={image4} alt="4" className='image' />
        <div className="list-offer">
          <AddInfo
            currentVacancyInfo={currentVacancyInfo}
            keyProp={infoEntities.list_offer()}
          />
        </div>
      </div>
    </div>
  );
};
