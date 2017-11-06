// @flow
import React from "react";
import Form from "../Form";

const FormList = () => (
  <div>
    <section id="login">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2>Login</h2>
            <Form action="/login" />
          </div>
        </div>
      </div>
    </section>

    <section id="signup" className="bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2>Sign up</h2>
            <Form action="/signup" />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default FormList;
