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
            <div class='row'>
                <div class='col-md-4 offset-md-4'>
                    <h1>Sign Up</h1>
            
            
                    <input className='form-control' type='text' onChange={e => this.setState({username: e.target.value})} size='small' type='text' placeholder='Desired User Name (Required)' />
                    <input className='form-control' type='text' onChange={e => this.setState({email: e.target.value})} size='small' type='email' placeholder='Email (Required)' />
                    <input className='form-control' type='text' onChange={e => this.setState({password: e.target.value})} size='small' type='password' placeholder='Password (Required)' />


                    <button className='btn btn-primary' onClick={this.maybeSubmit}>Shorten!</button>
                </div>
                
            


            </div>
        );
    }
}

export default Signup;