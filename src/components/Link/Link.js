import React, { Component } from "react";
import { render } from "react-dom";

class Link extends Component {
  render() {
    let style = {
      marginTop: "20px",
      textAlign: "center"
    };

    return (
      <div className="container">
        <p style={style}>
          <h4>
            <a
              className="btn btn-outline-primary"
              onClick={e => e.stopPropagation()}
              href="/auth/facebook"
            >
              Link your account to Facebook
            </a>
          </h4>
        </p>
      </div>
    );
  }
}

export default Link;
