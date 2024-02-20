import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
// import type { TFunction } from 'i18next';

import { actions as dataActions } from '../slices/dataSlice';
import { getDataState } from '../utils/selectors';
import { apiRoutes, pageRoutes } from '../utils/routes';
import type { VacancyList, NamedEntity } from '../types/interfaces';

interface StackInfoProps {
  vacancy: VacancyList;
  keyProp: keyof VacancyList;
}

const StackInfo: React.FC<StackInfoProps> = ({ vacancy, keyProp }) => {
  const { t } = useTranslation();

  if (!vacancy) return null;
  const items = vacancy[keyProp] as NamedEntity[];

  return (
    <>
      <p className="sm-text">{t('main.text.2')}</p>
      {items.map(({ name }: NamedEntity) => (
        <div key={name} className="technology">
          {name}
        </div>
      ))}
    </>
  );
};

export const Main: React.FC = (): React.JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { vacancyList } = useSelector(getDataState);
  const frontendVacancies = vacancyList.filter((item) => item.id === 3);
  const [vacancy] = frontendVacancies;

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(apiRoutes.vacancies());
      dispatch(dataActions.setVacancyList(response.data));
    };

    getData();
  }, [dispatch]);

  return (
    <>
      <header>
        <div className="title">
          <h1>{t('main.title.1')}</h1>
          <h1>{t('main.title.2')}</h1>
        </div>
      </header>
      <main>
        <p className="l-text">{t('main.text.1')}</p>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="vacancy-info">
            <h3 className="vacancy-title">{t('main.title.3')}</h3>
            <div className="main-stack">
              <StackInfo vacancy={vacancy} keyProp='main_technologies' />
            </div>
            <div className="more-stack">
              <StackInfo vacancy={vacancy} keyProp='more_technologies' />
            </div>
            <Link to={pageRoutes.more()}>
              <button type="button" aria-label="more info">{t('main.buttonText')}</button>
            </Link>
          </div>
        ))}
      </main>
    </>
  );
};
