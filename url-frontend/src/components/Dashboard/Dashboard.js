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
            links => this.setState({ links: links }),
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
                <div className='row'>

                    <div className='jumbotron'>
                        <h1 className="display-4"><strong>{this.shortener.username}'s</strong> Dashboard</h1>
                        {/* {
                            this.state.userStats && this.state.userStats.geo_data ?
                            <GeoBreakdown
                            stats={this.state.userStats.geo_data} /> : <span>No geo data available.</span>
                        }

                        {
                            this.state.userStats && this.state.userStats.hours_utc ?
                            <HoursBreakdown
                            stats={this.state.userStats.hours_utc} /> : <span>No hours usage data available.</span>
                        } */}
                        <p>
                            Here you can see stats about how people are engaging with your links!
                        </p>
                    </div>

                    </div>

                    <div className='row'>

                    <div className='col-sm-12 col-md-4'>
                        <ul className='list-group'>
                            <li class='list-group-item'>Overal stats for '{this.shortener.username}'</li>
                            {
                                this.state.links ?
                                this.state.links.map(
                                    link => <li className='list-group-item'>https://bytely.me/{link.short_code}</li>
                                ) : <li className='list-group-item'>You haven't created any links!</li>
                            }
                        </ul>
                    </div>

                    <div className='col-sm-12 col-md-8'>
                        stats
                    </div>
                    </div>

            </div>
        );
    }

}

export default Dashboard;