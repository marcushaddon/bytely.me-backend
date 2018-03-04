import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Shortener from '../../ShortenerService';
import StatHelper from '../../StatHelper';

// UI
import { Grid, Button, Divider, Input } from 'semantic-ui-react';
import PortionBreakdown from '../PortionBreakdown/PortionBreakdown';
import StatBreakdown from '../StatBreakdown/StatBreakdown';

class Dashboard extends Component {

    constructor() {
        super();
        this.shortener = new Shortener();
        this.state = {
            stats: {},
            links: []
        };        
    }

    componentDidMount() {
        this.shortener.getLinks()
        .then(res => res.json())
        .then(
            links => this.links = links,
            err => console.log(err)
        );

        this.shortener.getUserStats()
        .then(res => res.json())
        .then(
            userStats => {
                this.setState({ userStats: userStats })
            },
            err => console.log(err)
        );
    }

    render() {
        return (
            <Grid
            container 
            textAlign='left' 
            stackable
            >
                <Grid.Row className='top'>
                    <Grid.Column>
                        <h1>
                            Dashboard
                        </h1>
                        <p>
                            Here you can see all the links you've created, and satistics about when, where, and how people are engaging with them.
                        </p>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <h2>Overall</h2>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={8}>
                        {this.state.userStats ? <StatBreakdown stats={this.state.userStats} /> : <span>Fetching stats...</span> }
                    </Grid.Column>
                </Grid.Row>

                

            </Grid>
        );
    }

}

export default Dashboard;