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
            <div className='row'>
                <div className='col-md-4 offset-md-4'>
                    <div className='form-group'>
                    <h1>Login</h1>

                    <input className='form-control' type='text' onChange={e => this.setState({username_or_email: e.target.value})} size='small' type='text' placeholder='Desired User Name (Required)' />
                    <input className='form-control' type='text' onChange={e => this.setState({password: e.target.value})} size='small' type='password' placeholder='Password (Required)' />
                    <button className='btn btn-primary' onClick={this.maybeSubmit}>Log In</button>
                
                </div>
            </div>
            
        


            </div>
        );
    }
}

export default Signup;