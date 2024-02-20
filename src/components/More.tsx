import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { getDataState } from '../utils/selectors';
import { apiRoutes } from '../utils/routes';
import { actions as dataActions } from '../slices/dataSlice';
import type { CurrentVacancyInfo, NamedEntity } from '../types/interfaces';
import { morePageImages } from '../assets/images';

interface MoreItemProps {
  currentVacancyInfo: CurrentVacancyInfo | null;
}

interface AddInfoProps extends MoreItemProps {
  keyProp: keyof CurrentVacancyInfo;
}

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

const MoreItem: React.FC<MoreItemProps> = ({ currentVacancyInfo }) => {
  const { t } = useTranslation();

  return (
    <>
      {morePageImages.map(({ src, id }) => (
        <div key={id} className={`item-${id}`}>
          {id === 1 && <p>{t('more.text')}</p>}
          <img src={src} alt={`item-${id}`} className='image' />
          {id === 2 && (
            <div className="more-stack-wrapper">
              <div className="requirements">
                <AddInfo
                  currentVacancyInfo={currentVacancyInfo}
                  keyProp="min_requirements"
                />
              </div>
              <div className="technologies">
                <AddInfo
                  currentVacancyInfo={currentVacancyInfo}
                  keyProp="more_technologies"
                />
              </div>
            </div>
          )}
          {(id === 3 || id === 4) && (
            <div className={id === 3 ? 'tasks-wrapper' : 'list-offer-wrapper'}>
              <AddInfo
                currentVacancyInfo={currentVacancyInfo}
                keyProp={id === 3 ? 'tasks' : 'list_offer'}
              />
            </div>
          )}
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
      <MoreItem currentVacancyInfo={currentVacancyInfo} />
    </div>
  );
};
