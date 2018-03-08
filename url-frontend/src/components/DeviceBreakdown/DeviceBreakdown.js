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
            stats: this.props.stats
            
        }
    }

    

    shouldComponentUpdate() {
        return true;
    }

    
    
    render() {
        
        return (
            <div className='stat-section'>
                <h3>Device Type Stats</h3>
                {
                    <PortionBreakdown stats={this.state.stats} title='Device Type' />
                }
            </div>
        );
    }
}

export default GeoBreakdown;