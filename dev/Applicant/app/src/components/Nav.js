import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';


class Nav extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <Navbar brand='TA Applicant System' right></Navbar>
        );
    }
}

export default Nav;