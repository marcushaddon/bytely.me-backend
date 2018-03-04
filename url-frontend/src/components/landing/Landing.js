import React, { Component } from 'react';
import ShortenForm from '../shortenform/ShortenForm';
import { Link } from 'react-router-dom';

import './landing.css';



class Landing extends Component {
    

    loading = true;
    render() {
        return (
            <div className='container'>
            <div class='row'>
                <div class='col-md-6 offset-md-3'>
                

                    <div className='jumbotron'>
                    
                        <h1 className="display-4">bytely.me</h1>
                        <ShortenForm />
                        
                    </div>

                    

                    <div>
                        <div>
                            <h2>Why sign up for this service?</h2>
                            <p>
                                An account allows you to create <strong>custom branded short links</strong> (/mycoollink). You will also have the ability to log in and review the links you have created, and view traffic statistics (date, time of day, location, language, device type) for each link.
                            </p>
                        </div>
                        <div>
                            <Link to='/signup'>
                                <button className='btn btn-primary' color='teal'>Sign Up</button>
                            </Link>
                            <Link to='/login'>
                                <button className='btn btn-primary'>Log In</button>
                            </Link>
                        </div>
                    </div>  

                </div>
            </div>
                   
            </div>
        )
    }
}

export default Landing;