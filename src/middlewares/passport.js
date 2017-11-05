var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var User = require("../data/models/user");
var passport = require("passport");

module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    "local_signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        User.findOne({ "local.email": email }, function(err, user) {
          if (err) return done(err);

          if (user) {
            return done(null, false, req.flash("error", "User already exists"));
          } else {
            var newUser = new User();
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  passport.use(
    "local_login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        User.findOne({ "local.email": email }, function(err, user) {
          if (err) return done(err);

          if (!user)
            return done(null, false, req.flash("error", "No user found."));

          if (!user.validPassword(password))
            return done(
              null,
              false,
              req.flash("error", "Oops! Wrong password.")
            );

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
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ["id", "name", "email"],
        passReqToCallback: true,
        enableProof: true
      },

      function(req, token, refreshToken, profile, done) {
        var user = req.user;
        user.facebook.id = profile.id;
        user.facebook.token = token;
        user.facebook.name =
          profile.name.familyName + " " + profile.name.givenName;
        user.save(function(err) {
          if (err) {
            throw err;
          }

          return done(null, user);
        });
      }
    )
  );
};
