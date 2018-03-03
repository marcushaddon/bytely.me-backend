import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Shortener from '../../ShortenerService';

import './signup.css';

// UI
import { Grid, Button, Divider, Input } from 'semantic-ui-react';

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
            <Grid 
            // className='spash'
            container 
            textAlign='center' 
            verticalAlign='middle'
            stackable
            >
            <Grid.Row>
                <h1>Sign Up</h1>
            </Grid.Row>
            <Grid.Row>
                <Input onChange={e => this.setState({username: e.target.value})} size='small' type='text' placeholder='Desired User Name (Required)' />
            </Grid.Row>
            <Grid.Row>
                <Input onChange={e => this.setState({email: e.target.value})} size='small' type='email' placeholder='Email (Required)' />
            </Grid.Row>
            <Grid.Row>
                <Input onChange={e => this.setState({password: e.target.value})} size='small' type='password' placeholder='Password (Required)' />
            </Grid.Row>

            <Grid.Row columns={1}>
                <Button size='small' onClick={this.maybeSubmit}>Shorten!</Button>
            </Grid.Row>


            </Grid>
        );
    }
}

export default Signup;