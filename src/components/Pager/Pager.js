import React, { Component } from 'react';
import { render } from 'react-dom';

class Pager extends Component {
  render() {
    let style = {
      cursor: 'pointer'
    };

    return (
      <ul className="pagination justify-content-center mb-4">
        <li style={style} className={this.props.previous ? 'page-item' : 'page-item disabled'}>
          <a onClick={this.props.previousClick} className="page-link">
            &larr; Previous
          </a>
        </li>
        <li style={style} className={this.props.next ? 'page-item' : 'page-item disabled'}>
          <a onClick={this.props.nextClick} className="page-link">
            Next &rarr;
          </a>
        </li>
      </ul>
    );
  }
}

export default Pager;
