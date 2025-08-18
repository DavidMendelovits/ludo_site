import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShowPage from './pages/ShowPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shows/:showId" element={<ShowPage />} />
      </Routes>
    </Layout>
  );
}

export default App;