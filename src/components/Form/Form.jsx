import React, { Component } from 'react';
import { render } from 'react-dom';

class Form extends Component {
  render() {
    let style = {
      cursor: 'pointer'
    };

    return (
      <form action={this.props.children} method="post">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input name="email" type="email" className="form-control" placeholder="Email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
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
  }
}

export default Form;
