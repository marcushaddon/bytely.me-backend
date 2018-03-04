import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Shortener from '../../ShortenerService';
import StatHelper from '../../StatHelper';

// UI
import PortionBreakdown from '../PortionBreakdown/PortionBreakdown';
import StatBreakdown from '../StatBreakdown/StatBreakdown';
import GeoBreakdown from '../GeoBreakdown/GeoBreakdown';
import HoursBreakdown from '../HoursBreakdown/HoursBreakdown';

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
            <div>
                {
                    this.state.userStats && this.state.userStats.geo_data ?
                    <GeoBreakdown
                    stats={this.state.userStats.geo_data} /> : <span>No geo data available.</span>
                }

                {
                    this.state.userStats && this.state.userStats.hours_utc ?
                    <HoursBreakdown
                    stats={this.state.userStats.hours_utc} /> : <span>No hours usage data available.</span>
                }
            </div>
                                
                            

        );
    }

}

export default Dashboard;