import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Shortener from '../../ShortenerService';

import './login.css';

// UI


class Signup extends Component {

    constructor() {
        super();
        this.state = {
            username_or_email: '',
            password: '',
            success: false
        };
        this.shortener = new Shortener();
        this.maybeSubmit = this.maybeSubmit.bind(this);
    }

    maybeSubmit() {
        // TODO: Validate
        this.shortener.post('login', this.state)
        .then(res => res.json())
        .then(
            res => { 
                const token = res.token;
                const user = res.user;
                window.localStorage.setItem('shortener-token', token);
                window.localStorage.setItem('shortener-username', user.username);
                window.localStorage.setItem('shortener-email', user.email);
                window.localStorage.setItem('shortener-userid', user._id);
                console.log(res)
                this.setState({
                    success: true
                });
            },
            err => alert(err)
        )
    }

    render() {
        if (this.state.success) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div>
                <div>
                    <h1>Login</h1>
                </div>
                <div>
                    <input type='text' onChange={e => this.setState({username_or_email: e.target.value})} size='small' type='text' placeholder='Desired User Name (Required)' />
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