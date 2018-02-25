import React, { Component } from 'react';
import { Grid, Button, Divider, Input } from 'semantic-ui-react'
import Shortener from '../../ShortenerService';

import './landing.css';


class Landing extends Component {
    constructor() {
        super();
        this.state = {
            longUrl: "",
            shortUrl: ""
        };


        this.shortener = new Shortener()
        this.shortenUrl = this.shortenUrl.bind(this);
        this.setUrl = this.setUrl.bind(this);
    }

    shortenUrl(e) {
        // TODO: Validate
        this.shortener.shorten(this.state.longUrl)
        .then(res => res.json())
        
        .then(data => {
            this.setState({ shortUrl: data.short_url })
        }, failure => {
            console.log("FAILED")
        })
        
    }

    setUrl(e) {
        this.state.longUrl = e.target.value;
    }

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
                    <Input size='small' placeholder='Long URL' focus onChange={this.setUrl} />
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Input size='small' placeholder='Custom Brand' disabled />
                </Grid.Row>
                <Grid.Row>
                    <Input size='small' readOnly value={this.state.shortUrl} placeholder='Short Url!' />
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Button size='small' onClick={this.shortenUrl}>Shorten!</Button>
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