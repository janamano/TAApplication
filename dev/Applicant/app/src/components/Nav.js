import React, { Component } from 'react';
import { Navbar, Tabs, Tab, Button } from 'react-materialize';
import { hashHistory } from 'react-router';

import 'whatwg-fetch';

let utils = require('../utils.js');
let json = utils.json;

export default class Nav extends Component {
    constructor(props) {
        super(props);

        this.goToProfile = this.goToProfile.bind(this);
        this.goToHistory = this.goToHistory.bind(this);
        this.goToSelection = this.goToSelection.bind(this);
        this.goToCart = this.goToCart.bind(this);
        this.logout = this.logout.bind(this);
    }

    goToProfile() {
        var t = this;
        fetch('/get-applicant?studentNum=' + t.props.stunum, { method: 'GET' })
            .then(json)
            .then(function(data) {
                if (data.status === "success") {
                    const student = data.data[0];
                    hashHistory.push({
                        pathname: `/profile`,
                        state: { data: student }
                    })
                } else {
                    throw "err";
                }
            })
            .catch(function(err) {
                throw err;
            });
    }

    goToHistory() {
        var t = this;
        fetch('/get-applicant?studentNum=' + t.props.stunum, { method: 'GET' })
            .then(json)
            .then(function(data) {
                if (data.status === "success") {
                    const student = data.data[0];
                    
                    hashHistory.push({
                        pathname: `/history`,
                        state: { 
                            UTORid: t.props.UTORid,
                            studentNumber: t.props.stunum,
                            TAHistory: (typeof student.studentInformation != 'undefined' && 
                                    typeof student.studentInformation.TAHistory != 'undefined') 
                                    ? 
                                student.studentInformation.TAHistory : []
                        }
                    });
                } else {
                    throw "err";
                }
            })
            .catch(function(err) {
                throw err;
            });
    }

    goToSelection() {
        var t = this;
        hashHistory.push({
            pathname: `/courseselection`,
            state: { 
                UTORid: t.props.UTORid,
                studentNumber: t.props.stunum,
            }
        })
    }

    goToCart() {
        var t = this;
        hashHistory.push({
            pathname: `/cart`,
            state: { 
                UTORid: t.props.UTORid,
                studentNumber: t.props.stunum,
            }
        });
    }

    logout() {
        hashHistory.push(`/`);
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
        var style3 = {
            marginLeft: "1.5%",
            marginRight: "1.5%"
        }
        var style4 = {
            paddingTop: "0.8%",
            paddingBottom: "1%"
        }
        var style5 = {
            float: 'right',
            marginRight: "2%",
        }
        var style6 = {
            marginLeft: "11%",
            marginRight: "1.5%"
        }

        let navButtons = null;
        if (this.props.activePage !== "Login") {
            navButtons = 
                <div className="center" style={style4}>
                    <Button className={(this.props.activePage == "Profile") ? "red darken-3" : ""}
                        style={style6}
                        waves="waves-effect waves-light btn-large" 
                        onClick={this.goToProfile}>
                        Profile
                    </Button>
                    <Button className={(this.props.activePage == "Applicant History") ? "red darken-3" : ""}
                        style={style3}
                        waves="waves-effect waves-light btn-large" 
                        onClick={this.goToHistory}>
                        Applicant History
                    </Button>
                    <Button className={(this.props.activePage == "Course Selection") ? "red darken-3" : ""}
                        style={style3}
                        waves="waves-effect waves-light btn-large" 
                        onClick={this.goToSelection}>
                        Course Selection
                    </Button>
                    <Button className={(this.props.activePage == "Course Cart") ? "red darken-3" : ""}
                        style={style3}
                        waves="waves-effect waves-light btn-large" 
                        onClick={this.goToCart}>
                        Course Cart
                    </Button>
                    <Button className="grey darken-4"
                        style={style5}
                        waves="waves-effect waves-light btn-large" 
                        onClick={this.logout}
                        >
                        Logout
                    </Button>
                </div>
        }

        return (
            <div>
                {navButtons}
                <Navbar style={style} className='indigo darken-4' brand={this.props.heading} right></Navbar>
            </div>
        );
    }
}

Nav.propTypes = {
    heading: React.PropTypes.string,
    stunum: React.PropTypes.number,
    UTORid: React.PropTypes.string,
    activePage: React.PropTypes.string
};