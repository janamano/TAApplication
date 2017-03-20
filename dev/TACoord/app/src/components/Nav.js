import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';

export default class Nav extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var style = {
            paddingLeft: '39%',
            marginBottom: '2%'
        }
        return (
            <Navbar style={style} className="indigo darken-4" brand={this.props.heading} right></Navbar>
        );
    }
}

Nav.propTypes = {
    heading: React.PropTypes.string
};