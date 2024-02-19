import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path='/'></Route>
      <Route path='/more'></Route>
    </Routes>
  </Router>
);
