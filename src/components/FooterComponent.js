import React, { Component } from 'react';
import { render } from 'react-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="py-5 bg-dark">
              <div className="container">
                <p className="m-0 text-center text-white">Copyright &copy; 2017</p>
              </div>
            </footer>
        )
    }
}

export default Footer;