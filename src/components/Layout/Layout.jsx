import React from 'react';
import Header from '../Header';
import Body from '../Body';
import Contact from '../Contact';
import Footer from '../Footer';

const Layout = () => (
  <div>
    <Header {...this.props} />
    <Body {...this.props} />
    <Contact />
    <Footer />
  </div>
);

export default Layout;
