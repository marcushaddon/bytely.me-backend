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
            links: [],
            activeLink: null,
            coolthing: {}
        };

        this.setActiveLink = this.setActiveLink.bind(this);
        this.getLinkStats = this.getLinkStats.bind(this);
        this.clearActiveLink = this.clearActiveLink.bind(this);
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
                this.setState({ stats: userStats })
            },
            err => console.log(err)
        );
    }

    getLinkStats() {
        if (this.state.activeLink) {
            this.shortener.getLinkStats(this.state.activeLink._id)
            .then(res => res.json())
            .then(stats => this.setState({ stats: stats}))
        } else {
            this.shortener.getUserStats()
            .then(res => res.json())
            .then(
                userStats => {
                    this.setState({ stats: userStats })
                },
                err => console.log(err)
                );
        }       
        
    }

    setActiveLink(index) {
        let link = this.state.links[index];
        this.setState({activeLink: link}); // WHYY NO WORK
        this.state.activeLink = link;
        
        this.getLinkStats();
    }

    clearActiveLink() {
        this.state.activeLink = null; // WHY DOESNT SET STATE WORK
        this.getLinkStats()
    }


    render() {
        return (
            <div>
                <div className='row'>

                    <div className='jumbotron'>
                        <h1 className="display-4"><strong>{this.shortener.username}'s</strong> Dashboard</h1>
                        
                        <p>
                            Here you can see stats about how people are engaging with your links!
                        </p>
                        <Link to='/'>&lt;&lt; Url Shortener</Link>
                    </div>

                    </div>

                    <div className='row'>

                        <div className='col-sm-12 col-md-3'>
                            <ul className='list-group'>
                                <li onClick={this.clearActiveLink} className={'list-group-item ' + (this.state.activeLink ? '': 'active')}>Overal stats for '{this.shortener.username}'</li>
                                {
                                    this.state.links ?
                                    this.state.links.map(
                                        (link, index) => <li key={index} onClick={this.setActiveLink.bind(this, index)} className={'list-group-item ' + (this.state.activeLink && this.state.activeLink._id === link._id ? 'active': '')}>https://bytely.me/{link.short_code}</li>
                                    ) : <li className='list-group-item'>You haven't created any links!</li>
                                }
                            </ul>
                        </div>

                        <div className='col-sm-12 col-md-9'>
                            <div className='row'>
                                
                                <div className='col-sm-12'>
                                    {
                                        this.state.stats && this.state.stats.hours_utc ?
                                        <HoursBreakdown
                                        stats={this.state.stats.hours_utc} /> : <span>No hours usage data available.</span>
                                    }
                                </div>

                                <div className='col-sm-12 col-md-6'>
                                    
                                    {
                                        this.state.stats && this.state.stats.geo_data ?
                                        <GeoBreakdown
                                        stats={this.state.stats.geo_data} /> : <span>No geo data available.</span>
                                    }
            
                                </div>

                            </div>
                        </div>

                        

                        
                    </div>
            </div>
        );
    }

}

export default Dashboard;