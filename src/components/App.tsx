import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { pageRoutes } from '../utils/routes';

import { Main } from './Main';
import { More } from './More';

export const App: React.FC = (): React.JSX.Element => (
  <Router>
    <Routes>
      <Route path={pageRoutes.main()} element={<Main />}></Route>
      <Route path={pageRoutes.more()} element={<More />}></Route>
    </Routes>
  </Router>
);
