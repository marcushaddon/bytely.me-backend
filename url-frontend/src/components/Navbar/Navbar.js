import React, { Component } from 'react';
import ShortenForm from '../shortenform/ShortenForm';
import { Link } from 'react-router-dom';

import ShorterService from '../../ShortenerService';

class Navbar extends Component {
    shortener;
    constructor() {
        super();
        this.shortener = new ShorterService();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul class="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;