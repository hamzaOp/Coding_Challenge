import React, { Component } from 'react';
import Header from '../Header';
import Body from '../Body';
import Contact from '../Contact';
import Footer from '../Footer';
import { render } from 'react-dom';

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
