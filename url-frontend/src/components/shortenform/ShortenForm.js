import React, { Component } from 'react';
import Shortener from '../../ShortenerService';

// UI
import { Grid, Button, Divider, Input } from 'semantic-ui-react';

class ShortenForm extends Component {
    constructor() {
        super();
        this.state = {
            longUrl: "",
            shortUrl: "",
            brand: ""
        };


        this.shortener = new Shortener()
        this.shortenUrl = this.shortenUrl.bind(this);
        this.setUrl = this.setUrl.bind(this);
        this.setBrand = this.setBrand.bind(this);
    }

    shortenUrl(e) {
        // TODO: Validate
        this.shortener.shorten(this.state.longUrl, this.state.brand)
        .then(res => res.json())
        
        .then(data => {
            this.setState({ shortUrl: data.short_url })
        }, failure => {
            console.log("FAILED")
        })
        
    }

    setUrl(e) {
        this.state.longUrl = e.target.value;
    }

    setBrand(e) {
        console.log("setting brand " + e.target.value);
        this.state.brand = e.target.value;
    }

    render() {
        return (
            <div>
                <Grid.Row>
                    <Input size='small' placeholder='Long URL' focus onChange={this.setUrl} />
                </Grid.Row>
                <Grid.Row>
                    <Input size='small' onChange={this.setBrand} placeholder='Custom Brand' disabled={!this.shortener.loggedIn} />
                </Grid.Row>
                <Grid.Row>
                    <Input size='small' readOnly value={this.state.shortUrl} placeholder='Short Url!' />
                </Grid.Row>
                <Grid.Row>
                    <Button size='small' onClick={this.shortenUrl}>Shorten!</Button>
                </Grid.Row>
                {this.brand} {this.longUrl}
            </div>
        )
    }
}

export default ShortenForm;