import React, { Component } from 'react';
import Shortener from '../../ShortenerService';



class ShortenForm extends Component {
    constructor() {
        super();
        this.state = {
            longUrl: "",
            shortUrl: "",
            brand: "",
            errorMessage: null
        };


        this.shortener = new Shortener()
        this.shortenUrl = this.shortenUrl.bind(this);
        this.setUrl = this.setUrl.bind(this);
        this.setBrand = this.setBrand.bind(this);
    }

    shortenUrl(e) {
        // TODO: Validate
        this.shortener.shorten(this.state.longUrl, this.state.brand)
        .then(res => {
            if (res.status >= 400) {
                console.log("FAILURE")
                res.json()
                .then(err => {
                    console.log(err.message)
                    this.setState({ errorMessage: err.message })
                })
                
            }
        })
        .then(res => res.json())
        
        .then(data => {
            this.setState({ shortUrl: data.short_url })
        }).catch(failure => {
            console.log("error is promise handling", failure)
            
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
            <div className='form-group'>

                <label htmlFor="long-url">Long URL</label>
                <input id='long-url' className='form-control' type='text' placeholder='ex: https://www.mysite.com/resrouce/longid/lkajdsf?filter=thing&callback=blahblahblah' onChange={this.setUrl} />

                <label htmlFor="brand">Custom Brand <span className="badge badge-secondary">Members Only!</span></label>
                <input id='brand' className='form-control' type='text' onChange={this.setBrand} placeholder='ex: promo' disabled={!this.shortener.loggedIn} />
                
                <label htmlFor="short-url">Shortened URL</label>
                <input className='form-control'type='text' placeholder='https://bytely.me/promo' readOnly value={this.state.shortUrl}/>

                <button className="btn btn-primary" onClick={this.shortenUrl}>Shorten!</button>

                {this.state.errorMessage &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div>
                }
                

            </div>
        )
    }
}

export default ShortenForm;