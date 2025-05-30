import React from 'react';
import { useAppDispatch } from '@redux/hooks';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import Layout from "@views/Layout"
import ContentView from '@views/ContentView/ContentView';

import '@styles/main.scss';
import { theme } from '@styles/theme';


const App = () => {

  return (
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/content" replace />} />
              <Route path="/content" element={<ContentView />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
  )
};

export default App;