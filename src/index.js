// IMPORT STYLES TO BE WEBPACKED
import './../public/sass/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './App';

axios.get('/streets')
   .then(resp => {
    ReactDOM.render(

      <App streets={resp.data}/>,
      document.getElementById('react-container')
    );
})
.catch(console.error);
