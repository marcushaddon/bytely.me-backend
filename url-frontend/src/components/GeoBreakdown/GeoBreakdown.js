import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Shortener from '../../ShortenerService';
import StatHelper from '../../StatHelper';

// UI
import { Grid, Button, Divider, Input } from 'semantic-ui-react';
import PortionBreakdown from '../PortionBreakdown/PortionBreakdown';

class GeoBreakdown extends Component {

    fieldsOfInterest = [
        'country_name',
        'region_code',
        'postal_code',
        'city',
        'time_zone'

    ];
    render() {
        return (
            <div>
                {
                    this.fieldsOfInterest.map(
                        field => this.props.stats[field] ?
                        <PortionBreakdown stats={this.props.stats[field]} title={field} /> : <span></span>
                    )
                }
            </div>
        );
    }
}

export default GeoBreakdown;