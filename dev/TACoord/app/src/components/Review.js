import React, { Component } from 'react';
import { 
    Row,
    Button,
    Collapsible,
    CollapsibleItem,
    Modal,
    Collection,
    Navbar,
    NavItem } from "react-materialize";

import { hashHistory } from 'react-router';
import Applicant from './Applicant';
import ReviewCourse from './ReviewCourse';

import Filter from './Filter';

let utils = require('../utils.js');
let json = utils.json;


export default class Review extends Component {
    constructor(props) {
        super(props);

        const courseCarts = props.location.state.data;

        this.state = {
            courseCarts: courseCarts
        };

        this.goToHome = this.goToHome.bind(this);
        this.removeCourse = this.removeCourse.bind(this);
        
    }

    removeCourse(code) {
        var t = this;
        var carts = this.state.courseCarts;
        var i = 0;
        while (i < carts.length && carts[i].code != code) {
            console.log(carts[i].code);
            i++;
        }

        carts.splice(i, 1);

        t.setState({
            courseCarts: carts
        });
    }

    
    goToHome(e) {
        e.preventDefault();

        hashHistory.push({
            pathname: `/`
        })
    }
    render() {
            var style = {
            textAlign: 'center',
            width: '70%',
            //marginLeft: '2%',
            //marginBottom: '2%'
            
            margin: 'auto'
        }
        var headingStyle = {
            //textAlign: 'center',
            marginLeft: '15%'
        }
        var style2 = {
            textAlign: 'left'
        }
        var navStyle = {
            textAlign: 'center' ,
            marginTop:'0px'     
        }
        return (
            <div>
            <div className='navbar-fixed'>
                <Navbar style={navStyle} className="indigo darken-4" brand="TA Coordinator System" right>
                    <NavItem onClick={this.goToHome}>Home</NavItem>
                </Navbar>
            </div>
                <h3 style={headingStyle} className='thin'> Considered Applicants</h3>
                <Collapsible popout style={style} accordion={true}>
                    {this.state.courseCarts.map(course =>
                        <ReviewCourse key={course.code}
                                        code={course.code}
                                        assignedApplicants={course.applicants}
                                        removeCourse={this.removeCourse}
                        />
                    )}
                </Collapsible>
            </div>
        )
}
}