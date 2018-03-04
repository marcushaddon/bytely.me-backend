import React, { Component } from 'react';
import ShortenForm from '../shortenform/ShortenForm';
import { Link } from 'react-router-dom';

import './landing.css';



class Landing extends Component {
    

    loading = true;
    render() {
        return (
            <div 
            className='spash'
            container 
            textAlign='center' 
            verticalAlign='middle'
            stackable
            >
                <div>
                    <div>
                        <h1>Shorten a URL</h1>
                    </div>
                </div>

                <ShortenForm />

                <div>
                    <div>
                        <h2>Why sign up for this service?</h2>
                        <p>
                            An account allows you to create <strong>custom branded short links</strong> (/mycoollink). You will also have the ability to log in and review the links you have created, and view traffic statistics (date, time of day, location, language, device type) for each link.
                        </p>
                    </div>
                    <div>
                        <Link to='/signup'>
                            <button size='massive' color='teal' positive>Sign Up</button>
                        </Link>
                    </div>
                </div>     
            </div>
        )
    }
}

export default Landing;