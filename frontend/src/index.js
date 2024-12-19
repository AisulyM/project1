
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { MantineProvider } from '@mantine/core';

const container = document.getElementById('root'); // должен вернуть элемент <div id="root"></div>
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
