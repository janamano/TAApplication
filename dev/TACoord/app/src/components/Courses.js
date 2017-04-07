import React, { Component } from 'react';
import { Row, Button, Collapsible, Navbar, NavItem, Input } from "react-materialize";
import { hashHistory } from 'react-router';
import Course from './Course';

let utils = require('../utils.js');
let json = utils.json;
let courseCompare = utils.courseCompare; 

export default class Courses extends Component {
     constructor() {
        super();

        this.state = {
            courses: [],
            //courseCarts: []
        };

        this.componentWillMount = this.componentWillMount.bind(this);
        this.toggleCart = this.toggleCart.bind(this);
        this.goToReview = this.goToReview.bind(this);
        this.containsCourse = this.containsCourse.bind(this);
        this.index = this.index.bind(this);
        this.getIndex = this.getIndex.bind(this);
        
     }

     componentWillMount() {
        var t = this;
        
        //get all the courses
        
        fetch('/getOpenCourses', {method: 'GET'})
            .then(json)
            .then(function(data) {
                // store this in the state courses to create course objects
                const courses = data.data;
                t.setState({
                    courses: courses.map(function(course) {
                        return {code: course.code,
                            title: course.title,
                            numberOfTAs: course.numberOfTAs,
                            qualifications: course.qualifications}
                    })
                });
            })
            .catch(function(err) {
            // fetch didnt work
            throw err;
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

    // adds/removes students from the course (code) cart 
    toggleCart(code, student) {
        var carts = this.state.courseCarts;
        // if the course is not in the list of carts, then this student is accepted
        if (! this.containsCourse(code, carts)) {
            carts.push({code: code, applicants: [{studentNumber: student}] });
        } else {
            // find out if the student is already in the cart for this course
            // if they are, that means they just got rejected
            var currentCart = carts[this.index(code, carts)];

            var index = this.getIndex(currentCart.applicants, student);
            if (index > -1) {
                currentCart.applicants.splice(index, 1);
            } else {
                // this student is not in the cart, so add them
                currentCart.applicants.push({studentNumber: student});
            }

            carts[this.index(code, carts)] = currentCart;
        }

        this.setState({
           courseCarts: carts 
        });
    }

    // get the index of given student
    getIndex(list, student) {
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (item.studentNumber === student) {
                return i;
            }
        }   
        return -1;
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
    goToReview(e) {
        e.preventDefault();

        hashHistory.push({
            pathname: `/review`
        })
    }

    render() {
        var style = {
            textAlign: 'center',
            width: '70%',
            margin: 'auto'
        }

        var headingStyle = {
            marginLeft: '15%'
        }
        var navStyle = {
            marginTop: '0px'      
        }
        var style2 = {
            textAlign: 'center',
            
        }
        // TODO: implement lazy loading
        return (
            <div>
            <div className="navbar-fixed">
                <Navbar style={navStyle} className="fixed indigo darken-4" brand="TA Coordinator System" right>
                    <NavItem onClick={this.showPreview}>Preview</NavItem>                
                    <NavItem onClick={this.goToReview}>Review Changes</NavItem>
                </Navbar>
            </div>
                <div>
                    <h2 style={headingStyle} className="thin">Open Courses</h2>
                    <Collapsible style={style}>    
                        {this.state.courses.map(course =>
                            <Course key={course.code}
                                    code={course.code}
                                    title={course.title}
                                    numberOfTAs={course.numberOfTAs}
                                    //hours={course.number}
                                    qualifications={course.qualifications}
                                    onChange={this.toggleCart.bind(this)}
                            />
                            )
                        }
                    </Collapsible>
                </div>
            
            </div>
        )    
    }
}

/*

*/