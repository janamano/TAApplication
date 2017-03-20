import React, { Component } from 'react';
import { Navbar, NavItem, Breadcrumb, MenuItem } from 'react-materialize';

export default class Nav extends Component {
    constructor(props) {
        super(props);

        //this.goToProfile = this.goToProfile.bind(this);
    }
    
    render() {
        var style = {
            paddingLeft: '40%',
            marginBottom: '2%'
        }
        var style2 = {
            textAlign: 'center',
            width: '60%',
            marginLeft: 'auto',
        }
        return (
            <div>
                <Navbar style={style} className='indigo darken-4' brand={this.props.heading} right></Navbar>
            </div>
        );
    }
}

Nav.propTypes = {
    heading: React.PropTypes.string
};