import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getDataState } from '../utils/selectors';
import { apiRoutes, pageRoutes } from '../utils/routes';
import type { VacancyList, NamedEntity } from '../types/interfaces';
import type { AppDispatch } from '../types/aliases';
import { loadData } from '../thunks';

interface StackInfoProps {
  vacancy: VacancyList;
  keyProp: keyof VacancyList;
  text: string;
}

const StackInfo: React.FC<StackInfoProps> = ({ vacancy, keyProp, text }) => {
  if (!vacancy) return null;
  const items = vacancy[keyProp] as NamedEntity[];

  return (
    <>
      <p className="sm-text">{text}</p>
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
  const dispatch = useDispatch<AppDispatch>();
  const { vacancyList } = useSelector(getDataState);
  const frontendVacancies = vacancyList.filter((item) => item.id === 3);
  const [vacancy] = frontendVacancies;

  useEffect(() => {
    dispatch(loadData({
      apiRoute: apiRoutes.vacancies(),
      dataType: 'vacancyList',
    }));
  }, [dispatch]);

  const stackNames = ['main', 'more'];

  return (
    <>
      <header>
        <div className="title">
          <h1>{t('main.title.1')}</h1>
          <h1>{t('main.title.2')}</h1>
        </div>
      </header>
      <main>
        <p className="l-text">{t('main.text.info')}</p>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="vacancy-info">
            <h3>{t('main.title.3')}</h3>
            {stackNames.map((name) => (
              <div className={`${name}-stack`} key={name}>
                <StackInfo
                  vacancy={vacancy}
                  keyProp={`${name}_technologies` as keyof VacancyList}
                  text={t(`main.text.${name}`)}
                />
              </div>
            ))}
            <Link to={pageRoutes.more()}>
              <button type="button" aria-label="more info">
                {t('main.buttonText')}
              </button>
            </Link>
          </div>
        ))}
      </main>
    </>
  );
};
