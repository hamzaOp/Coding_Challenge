// @flow
import React from "react";

const Form = (props: { action: string }) => {
  const style = {
    cursor: "pointer"
  };

  return (
    <form action={props.action} method="post">
      <div className="form-group">
        <label htmlFor="email" />
        Email address
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" />
        Password
        <input
          pattern=".{3,}"
          title="Three or more characters"
          name="password"
          type="password"
          className="form-control"
          placeholder="Password"
          required
        />
      </div>
      <button style={style} type="submit" className="btn btn-outline-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
