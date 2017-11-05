import React, { Component } from "react";
import Gallery from "./GalleryComponent";
import FormList from "./FormListComponent";

import { render } from "react-dom";

class Body extends Component {
  render() {
    var Child;
    if (this.props.email) {
      Child = Gallery;
      return <Child {...this.props} />;
    }

    Child = FormList;
    return <Child />;
  }
}

export default Body;
