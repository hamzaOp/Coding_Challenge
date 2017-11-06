import React, { Component } from "react";
import Gallery from "../Gallery";
import FormList from "../FormList";

import { render } from "react-dom";

const Body = props => {
  let Child;
  if (props.email) {
    Child = Gallery;
    return <Child {...this.props} />;
  }

  Child = FormList;
  return <Child />;
};

export default Body;
