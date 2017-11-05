import React, { Component } from "react";
import Header from "./HeaderComponent";
import Body from "./BodyComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import { render } from "react-dom";

class Layout extends Component {
  render() {
    return (
      <div>
        <Header {...this.props} />
        <Body {...this.props} />
        <Contact />
        <Footer />
      </div>
    );
  }
}

export default Layout;
