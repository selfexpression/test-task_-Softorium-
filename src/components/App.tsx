import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Main } from './Main';

export const App: React.FC = (): React.JSX.Element => (
  <Router>
    <Routes>
      <Route path='/' element={<Main />}></Route>
      <Route path='/more'></Route>
    </Routes>
  </Router>
);
