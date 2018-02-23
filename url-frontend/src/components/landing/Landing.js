import React, { Component } from 'react';
import { Grid, Button, Divider, Input } from 'semantic-ui-react'

import './landing.css';


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
                <Grid.Row columns={1}>
                    <Input size='small' placeholder='Long URL' focus />
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Input size='small' placeholder='Custom Brand' disabled />
                </Grid.Row>

                <Divider />

                <Grid.Row columns={2}>
                    <Grid.Column>
                        <h2>Why sign up for this service?</h2>
                        <p>
                            An account allows you to create <strong>custom branded short links</strong> (/mycoollink). You will also have the ability to log in and review the links you have created, and view traffic statistics (date, time of day, location, language, device type) for each link.
                        </p>
                    </Grid.Column>
                    <Grid.Column>
                        <Button size='massive' color='teal' positive>Sign Up</Button>
                    </Grid.Column>

                </Grid.Row>
                
            </Grid>

        )
    }
}

export default Landing;