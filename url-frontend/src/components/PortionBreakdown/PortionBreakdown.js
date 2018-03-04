import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Shortener from '../../ShortenerService';
import StatHelper from '../../StatHelper';

// UI
import { Grid, Button, Divider, Input, Segment, Rail } from 'semantic-ui-react';
import PieChart from 'react-svg-piechart';

class PortionBreakdown extends Component {

    constructor(props) {
        super();
        this.state = {
            portions: StatHelper.statDictToPortions(props.stats),
            message: ''
        }

        this.hoverPieChart = this.hoverPieChart.bind(this);
    }

    hoverPieChart(d, i, e) {
        // Data, index, event
        if (d) {
            console.log(d)
            this.setState({message: `${d.title}: ${Math.floor(d.value/d.whole*100)}%`})
        } else {
            this.setState({message: ''})
        }
    }

    render() {
        
        return (
            <Segment>
                {
                    this.state.message.length ?
                    <Rail internal size='massive' position='right'>
                        <Segment>{this.state.message}</Segment>
                    </Rail> : <span></span>
                }
                
                <h4>{StatHelper.friendlyField(this.props.title)}</h4>
                {
                    <PieChart
                    data={this.state.portions}
                    expandOnHover
                    onSectorHover={this.hoverPieChart}
                    />
                }
            </Segment>
                
            
        );
        
    }
}

export default PortionBreakdown;