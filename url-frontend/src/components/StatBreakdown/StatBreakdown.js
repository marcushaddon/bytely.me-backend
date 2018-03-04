import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Shortener from '../../ShortenerService';
import StatHelper from '../../StatHelper';

// UI
import { Grid, Button, Divider, Input } from 'semantic-ui-react';
import HeaderBreakdown from '../HeaderBreakdown/HeaderBreakdown';
import GeoBreakdown from '../GeoBreakdown/GeoBreakdown';
import PortionBreakdown from '../PortionBreakdown/PortionBreakdown';

class StatBreakdown extends Component {

    render() {
        return (
            <Grid.Row>
                    <Grid.Column>
                        {/* {
                            this.props.stats && this.props.stats.headers ?
                            <HeaderBreakdown
                            title="Headers"
                            stats={this.props.stats.headers} /> : <span>No header info available.</span>
                        } */}

                        {
                            this.props.stats && this.props.stats.geo_data ?
                            <GeoBreakdown
                            stats={this.props.stats.geo_data} /> : <span>No geo data available.</span>
                        }
                        
                    </Grid.Column>
                </Grid.Row>
        );
    }
}

export default StatBreakdown;