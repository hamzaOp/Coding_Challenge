import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Layout from '../components/Layout';
import setupRouter from '../utilities/setup_route';
import passport from 'passport';
import User from '../data/models/user';
import buildUser from '../utilities/buildUser';

const AppFactory = React.createFactory(Layout);
var router = express.Router();
setupRouter(router);

router.use(function(req, res, next) {
  if (req.user) {
    res.locals.currentUser = buildUser(req.user);
  } else {
    res.locals.currentUser = {};
  }

  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

router.use(
  '/login',
  passport.authenticate('local_login', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })
);

router.use(
  '/signup',
  passport.authenticate('local_signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })
);

router.use(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

router.use('/auth/facebook', passport.authenticate('facebook', { scope: ['user_photos'] }));

router.use('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.use('/', function(req, res) {
  let componentInstance = AppFactory(res.locals.currentUser);
  res.format({
    'text/html': function() {
      res.render('index', {
        content: renderToString(componentInstance),
        errors: res.locals.errors,
        infos: res.locals.infos
      });
    },
    'application/json': function() {
      res.send(res.locals.currentUser);
    }
  });
});

module.exports = router;
