// @flow
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../data/models/user');
const passport = require('passport');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    'local_signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ 'local.email': email }, (err, user) => {
          if (err) return done(err);

          if (user) {
            return done(null, false, req.flash('error', 'User already exists'));
          }
          const newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(error => {
            if (error) throw error;
            return done(null, newUser);
          });

          return null;
        });
      }
    )
  );

  passport.use(
    'local_login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ 'local.email': email }, (err, user) => {
          if (err) return done(err);

          if (!user) return done(null, false, req.flash('error', 'No user found.'));

          if (!user.validPassword(password)) return done(null, false, req.flash('error', 'Oops! Wrong password.'));

          return done(null, user);
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['id', 'name', 'email'],
        passReqToCallback: true,
        enableProof: true
      },

      (req, token, refreshToken, profile, done) => {
        const { user } = req;
        user.facebook.id = profile.id;
        user.facebook.token = token;
        user.facebook.name = `${profile.name.familyName} ${profile.name.givenName}`;
        user.save(err => {
          if (err) {
            throw err;
          }

          return done(null, user);
        });
      }
    )
  );
};
