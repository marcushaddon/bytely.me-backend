import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Shortener from '../../ShortenerService';
import StatHelper from '../../StatHelper';

// UI
import { Grid, Button, Divider, Input, Segment, Rail } from 'semantic-ui-react';
import { LineChart, PieChart, BarChart } from 'react-easy-chart';

function formatHoursDict(hoursDict) {
    let data = [];
    for (let i = 1; i <= 24; i++) {
        let key;

        if (i % 12 == i) {
            key = i + 'a'
        } else {
            key = (i % 12) + 'p'
        }

        if (hoursDict[i]) {
            data.push({ x: key, y: hoursDict[i] })
        } else {
            data.push({ x: key, y: 0 })
        }
    }
    return data
}

class HoursBreakdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hours: formatHoursDict(props.stats),
            width: null,
            height: null
        }
    }

    saveRef = (ref) => this.containerNode = ref

    measure() {
        const {clientWidth, clientHeight} = this.containerNode
    
        this.setState({
          width: clientWidth,
          height: clientHeight,
        })
      }
    
      componentDidMount() {
        this.measure()
      }
    
    //   componentDidUpdate() {
    //     this.measure()
    //   }

    render() {
        return (
            <div ref={this.saveRef}>
                <h3>Engagement by Hour of Day</h3>
                <BarChart
                data={this.state.hours}
                axes
                axesLables={{x: "Time", y: "Engagement"}}
                width={this.state.width}
                margin={{top: 0, right: 0, bottom: 30, left: 10}}
                />

            </div>
        );
    }
}

export default HoursBreakdown;