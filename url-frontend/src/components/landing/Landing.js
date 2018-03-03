import React, { Component } from 'react';
import ShortenForm from '../shortenform/ShortenForm';
import { Link } from 'react-router-dom';

import './landing.css';

// UI
import { Grid, Button, Divider, Input } from 'semantic-ui-react';


class Landing extends Component {
    

    loading = true;
    render() {
        return (
            <Grid 
            className='spash'
            container 
            textAlign='center' 
            verticalAlign='middle'
            stackable
            >
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <h1>Shorten a URL</h1>
                    </Grid.Column>
                </Grid.Row>

                <ShortenForm />

                <Grid.Row columns={2}>
                    <Grid.Column>
                        <h2>Why sign up for this service?</h2>
                        <p>
                            An account allows you to create <strong>custom branded short links</strong> (/mycoollink). You will also have the ability to log in and review the links you have created, and view traffic statistics (date, time of day, location, language, device type) for each link.
                        </p>
                    </Grid.Column>
                    <Grid.Column>
                        <Link to='/signup'>
                            <Button size='massive' color='teal' positive>Sign Up</Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>     
            </Grid>
        )
    }
}

export default Landing;