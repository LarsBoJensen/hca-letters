import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HCALetterApp from './App';
import registerServiceWorker from './registerServiceWorker';

const supportsHistory = 'pushState' in window.history;

ReactDOM.render((
    <BrowserRouter basename="/hca-letters" forceRefresh={!supportsHistory}>
      <Route path="/" component={HCALetterApp} />
    </BrowserRouter>
  ),
  document.getElementById('root')
);
registerServiceWorker();
