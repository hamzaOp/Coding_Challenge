import React from "react";
import { render } from "react-dom";
import Nighthawk from "nighthawk";
import setupRouter from "./utilities/setup_route";
import App from "./components/AppComponent";
import rp from "request-promise";

const router = Nighthawk();

setupRouter(router);

router.use(function(req, res, next) {
  fetch(req.url, {
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    credentials: "include"
  })
    .then(function(data) {
      return data.json();
    })
    .then(function(data) {
      res.locals.currentUser = data;
      next();
    });
});

router.use(function(req, res, next) {
  render(<App {...res.locals.currentUser} />, document.getElementById("root"));
  next();
});

router.listen();
