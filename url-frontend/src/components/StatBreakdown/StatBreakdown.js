import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Shortener from '../../ShortenerService';
import StatHelper from '../../StatHelper';

// UI
import { Grid, Button, Divider, Input } from 'semantic-ui-react';
import HeaderBreakdown from '../HeaderBreakdown/HeaderBreakdown';
import GeoBreakdown from '../GeoBreakdown/GeoBreakdown';
import HoursBreakdown from '../HoursBreakdown/HoursBreakdown';
import PortionBreakdown from '../PortionBreakdown/PortionBreakdown';

class StatBreakdown extends Component {

    render() {
        return (
            <div>
                {
                    this.props.stats && this.props.stats.geo_data ?
                    <GeoBreakdown
                    stats={this.props.stats.geo_data} /> : <span>No geo data available.</span>
                }
                

                {
                    this.props.stats && this.props.stats.hours_utc ?
                    <HoursBreakdown
                    stats={this.props.stats.hours_utc} /> : <span>No hours usage data available.</span>
                }
            </div>

        );
    }
}

export default StatBreakdown;