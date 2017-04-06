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

        // const courseCarts = props.location.state.data;

        this.state = {
            courseCarts: []
        };

        this.componentWillMount = this.componentWillMount.bind(this);
        this.goToHome = this.goToHome.bind(this);
        this.removeCourse = this.removeCourse.bind(this);
        this.containsCourse = this.containsCourse.bind(this);
        this.index = this.index.bind(this);
        
    }

    componentWillMount() {
        var t = this;
         // fetch all the assignments for that are considered for employment
        fetch('/getAcceptedAssignments', {method: 'GET'})
            .then(json)
            .then(function(data) {
                // store all the assignments in a variable
                const assignments = data.data;
                
                var cart = [];
                console.log(assignments);
                // go through each assignment
                for(var i = 0; i < assignments.length; i++) {
                    var assignment = assignments[i];
                   
                    // check if the course assosiated with this assignment is already in the cart
                    if ( t.containsCourse(assignment.assignedCourse.code, cart)) {
                        // if it , then add it the applicant to its list of applicants
                        cart[t.index(assignment.assignedCourse.code, cart)].applicants.push({studentNumber: assignment.assignedApplicant});
                    } else {
                        // otherwise create a new entry
                        cart.push({code: assignment.assignedCourse.code, applicants: [{studentNumber:assignment.assignedApplicant}] });
                    }

                }

                t.setState({
                    courseCarts: cart
                }, function() {
                    //console.log(t.state.courseCarts)
                });
            })
            .catch(function(error) {
                throw error;
            });

    }
    // to check if a course is already in the list
    containsCourse(code, cart) {
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            if (item.code === code) {
                return true;
            }
        }
        return false;
    }
        // to check if a course is already in the list
    index(code, cart) {
        
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            if (item.code === code) {
                return i;
            }
        }
        return -1;
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