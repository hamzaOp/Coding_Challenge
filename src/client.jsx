import React from 'react';
import { render } from 'react-dom';
import Nighthawk from 'nighthawk';
import setupRouter from './utilities/setup_route';
import Layout from './components/Layout';

const router = Nighthawk();

setupRouter(router);

router.use((req, res, next) => {
  fetch(req.url, {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'include'
  })
    .then(data => {
      data.json();
    })
    .then(data => {
      res.locals.currentUser = data;
      next();
    });
});

router.use((req, res, next) => {
  render(<Layout {...res.locals.currentUser} />, document.getElementById('root'));
  next();
});

router.listen();
