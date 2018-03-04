import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Shortener from '../../ShortenerService';

import './signup.css';

// UI


class Signup extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            success: false
        };
        this.shortener = new Shortener();
        this.maybeSubmit = this.maybeSubmit.bind(this);
    }

    maybeSubmit() {
        // TODO: Validate
        this.shortener.post('signup', this.state)
        .then(
            res => {
                this.setState({
                    success: true
                });
                console.log(this.state);
            },
            err => {
                this.state.errorMessage = err;
            }
        )
    }

    render() {
        if (this.state.success) {
            return <Redirect to='/login' />
        }
        return (
            <div 
            // className='spash'
            container 
            textAlign='center' 
            verticalAlign='middle'
            stackable
            >
                <div>
                    <h1>Sign Up</h1>
                </div>
                <div>
                    <input type='text' onChange={e => this.setState({username: e.target.value})} size='small' type='text' placeholder='Desired User Name (Required)' />
                </div>
                <div>
                    <input type='text' onChange={e => this.setState({email: e.target.value})} size='small' type='email' placeholder='Email (Required)' />
                </div>
                <div>
                    <input type='text' onChange={e => this.setState({password: e.target.value})} size='small' type='password' placeholder='Password (Required)' />
                </div>

                <div columns={1}>
                    <button onClick={this.maybeSubmit}>Shorten!</button>
                </div>


            </div>
        );
    }
}

export default Signup;