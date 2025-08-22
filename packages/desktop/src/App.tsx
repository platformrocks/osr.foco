import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Mini from '@/pages/Mini';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/mini" element={<Mini />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/log" element={<div>Log page coming soon...</div>} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
