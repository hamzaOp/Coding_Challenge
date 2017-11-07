// @flow
import React from 'react';
import Header from '../Header';
import Body from '../Body';
import Contact from '../Contact';
import Footer from '../Footer';

const Layout = (props: {
  email: string,
  facebook: {
    id: string,
    name: string,
    token: string
  }
}) => (
  <div>
    <Header {...props} />
    <Body {...props} />
    <Contact />
    <Footer />
  </div>
);

export default Layout;
