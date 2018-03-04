import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Shortener from '../../ShortenerService';
import StatHelper from '../../StatHelper';

// UI
import { Grid, Button, Divider, Input, Segment, Rail } from 'semantic-ui-react';
import { PieChart } from 'react-easy-chart';

class PortionBreakdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            portions: StatHelper.statDictToPortions(props.stats),
            message: ''
        }

    }

    setPortions(props) {
        const portions = StatHelper.statDictToPortions(props.stats)
        this.setState({portions: portions})
    }

    componentWillReceiveProps(props) {
        this.setPortions(props)
    }

    render() {
        console.log("rendinger")
        return (
            <div>
                <h4>{StatHelper.friendlyField(this.props.title)}</h4>
                {
                    <PieChart
                    data={this.state.portions}
                    innerHoleSize={300}
                    padding={50}
                    labels
                    />
                }  
            </div>
            
        );
        
    }
}

export default PortionBreakdown;