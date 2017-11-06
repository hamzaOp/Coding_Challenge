// @flow
import React from "react";

const Pager = (props: {
  previous: string,
  next: string,
  previousClick: Function,
  nextClick: Function
}) => {
  const style = {
    cursor: "pointer"
  };

  return (
    <ul className="pagination justify-content-center mb-4">
      <li
        style={style}
        className={props.previous ? "page-item" : "page-item disabled"}
      >
        <button onClick={props.previousClick} className="page-link">
          &larr; Previous
        </button>
      </li>
      <li
        style={style}
        className={props.next ? "page-item" : "page-item disabled"}
      >
        <button onClick={props.nextClick} className="page-link">
          Next &rarr;
        </button>
      </li>
    </ul>
  );
};

export default Pager;
