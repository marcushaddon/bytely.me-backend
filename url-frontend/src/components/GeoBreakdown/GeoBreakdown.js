import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Shortener from '../../ShortenerService';
import StatHelper from '../../StatHelper';

// UI
import { Grid, Button, Divider, Input } from 'semantic-ui-react';
import PortionBreakdown from '../PortionBreakdown/PortionBreakdown';

class GeoBreakdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeStatName: 'city',
            activeStat: this.props.stats['city']
        }
        this.handleActiveStatChange = this.handleActiveStatChange.bind(this)
    }

    handleActiveStatChange(e) {
        this.setState({ activeStatName: e.target.value })
        this.setState({ activeStat: this.props.stats[e.target.value] })
    }

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
                <h3>Geo Location Stats</h3>
                Engagement by <select defaultValue='city' onChange={this.handleActiveStatChange}>
                    {
                        
                        this.fieldsOfInterest.map(
                            (field, index) => <option key={index} value={field}>{StatHelper.friendlyField(field)}</option>
                        )
                    }
                    
                </select>
                {
                    <PortionBreakdown stats={this.state.activeStat} title={StatHelper.friendlyField(this.state.activeStatName)} />
                }
            </div>
        );
    }
}

export default GeoBreakdown;