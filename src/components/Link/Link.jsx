import React from "react";

const Link = props => {
  const style = {
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
            href={props.href}
          >
            Link your account to Facebook
          </a>
        </h4>
      </p>
    </div>
  );
};

export default Link;
