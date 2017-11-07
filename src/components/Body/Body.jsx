// @flow
import React from 'react';
import Gallery from '../Gallery';
import FormList from '../FormList';

const Body = (props: {
  email: string,
  facebook: {
    id: string,
    name: string,
    token: string
  }
}) => {
  let Child;
  if (props.email) {
    Child = Gallery;
    return <Child {...props} />;
  }

  Child = FormList;
  return <Child />;
};

export default Body;
