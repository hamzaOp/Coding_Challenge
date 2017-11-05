import React, { Component } from 'react';
import Form from './FormComponent';
import { render } from 'react-dom';
var request = require('request');

class FormList extends Component {

    render() {

        
        return (
            <div>
            <section id="login">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h2>Login</h2>
                            <Form>/login</Form>
                        </div>
                    </div>
                </div>
            </section>

            <section id="signup" className="bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h2>Sign up</h2>
                            <Form>/signup</Form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
    }
}

export default FormList;