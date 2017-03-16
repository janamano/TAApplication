import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';

export default class Nav extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Navbar brand={this.props.heading} right></Navbar>
        );
    }
}

Nav.propTypes = {
    heading: React.PropTypes.string
};