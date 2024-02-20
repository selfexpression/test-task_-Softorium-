import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getDataState } from '../utils/selectors';
import { apiRoutes } from '../utils/routes';
import type { AppDispatch } from '../types/aliases';
import type { CurrentVacancyInfo, NamedEntity } from '../types/interfaces';
import { morePageImages } from '../assets/images';
import { loadData } from '../thunks';

interface MoreItemProps {
  currentVacancyInfo: CurrentVacancyInfo | null;
}

interface AddInfoProps extends MoreItemProps {
  keyProp: keyof CurrentVacancyInfo | string;
}

const AddInfo: React.FC<AddInfoProps> = ({ currentVacancyInfo, keyProp }) => {
  const { t } = useTranslation();

  if (!currentVacancyInfo) return null;
  const items = currentVacancyInfo[keyProp as keyof CurrentVacancyInfo] as NamedEntity[];

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

const MoreStackWrapper: React.FC<MoreItemProps> = ({ currentVacancyInfo }) => {
  const moreStackNames = {
    requirements: 'min_requirements',
    technologies: 'more_technologies',
  };

  return (
    <div className="more-stack-wrapper">
      {Object.entries(moreStackNames).map(([key, value]) => (
        <div key={key} className={key}>
          <AddInfo
            currentVacancyInfo={currentVacancyInfo}
            keyProp={value}
          />
        </div>
      ))}
    </div>
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
            <MoreStackWrapper currentVacancyInfo={currentVacancyInfo} />
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
  const dispatch = useDispatch<AppDispatch>();
  const { currentVacancyInfo } = useSelector(getDataState);

  useEffect(() => {
    dispatch(loadData({
      apiRoute: apiRoutes.frontendVacancy(),
      dataType: 'currentVacancyInfo',
    }));
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
