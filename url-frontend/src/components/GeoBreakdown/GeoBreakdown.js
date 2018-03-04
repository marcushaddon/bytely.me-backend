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
        'time_zone',
        'region_code',
        'city',
        'postal_code'
        ];
    render() {
        return (
            <div>
                {
                    this.fieldsOfInterest.map(
                        (field, index) => this.props.stats[field] ?
                        <PortionBreakdown key={index} stats={this.props.stats[field]} title={field} /> : <span></span>
                    )
                }
            </div>
        );
    }
}

export default GeoBreakdown;