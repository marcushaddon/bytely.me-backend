import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Shortener from '../../ShortenerService';
import StatHelper from '../../StatHelper';

// UI
import { Grid, Button, Divider, Input, Progress } from 'semantic-ui-react';

class PortionBreakdown extends Component {
    getColor(index) {
        const colors = [
            'red',
            'orange',
            'olive',
            'green',
            'teal',
            'blue',
            'violet',
            'purple',
            'pink',
            'brown',
            'grey'
        ];
        return colors[index % colors.length]
    }

    constructor(props) {
        super();
        this.state = {
            portions: StatHelper.statDictToPortions(props.stats)
        }
        this.getColor = this.getColor.bind(this);
    }

    render() {
        let colors = [];
        for (let i = 0; i < this.state.portions.length; i++) {
            colors.push(this.getColor(i));
        }
        
        return (
            <div>
                <h4>{this.props.title}</h4>
                {
                    this.state.portions.map(function(portion, index) {
                        return (<Progress 
                            percent={portion.percent} 
                            progress='percent' 
                            size='small' 
                            color={colors[index]}
                            key={index}
                            >
                            {portion.title}
                            </Progress>)
                    })

                }
            </div>
                
            
        );
        
    }
}

export default PortionBreakdown;