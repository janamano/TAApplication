import React, { Component } from 'react';
import { Row, Button, Collapsible } from "react-materialize";
import Course from './Course';

let utils = require('../utils.js');
let json = utils.json;
let courseCompare = utils.courseCompare; 

export default class Courses extends Component {
     constructor() {
        super();
        // initialize the list of courses
        this.state = {
            courses: [],
            courseCarts: []
        };

        this.componentWillMount = this.componentWillMount.bind(this);
     }

     componentWillMount() {
        var t = this;
        //get all the courses
        // fetch('/getOpenCourses', {method: 'GET'})
        //     .then(json)
        //     .then(function(data) {
        //         // store this in the state courses to create course objects
        //         const courses = data.data;
        //         t.setState({
        //             courses: courses.map(function(course) {
        //                 return {code: course.code,
        //                     title: course.title,
        //                     numberOfTAs: course.numberOfTAs,
        //                     qualifications: course.qualifications}
        //             })
        //         });
        //     })
        //     .catch(function(err) {
        //     // fetch didnt work
        //     throw err;
        // });

        // fetch all the assignments for that are considered for employment
        // fetch('/getApi?status=True', {method: 'GET'})
        //     .then(json)
        //     .then(function(data) {
        //         // store all the assignments in a variable
        //         const assignments = data.data;
        //         var cart = [];
                
        //         // go through each assignment
        //         for(var i = 0; i < assignments.length; i++) {
        //             var assignment = assignments[i];
        //             // check if the course assosiated with this assignment is already in the cart
        //             if (this.contains(assignment.assignedCourse, cart)) {
        //                 // if it , then add it the applicant to its list of applicants
        //                 cart[this.index(assignment.assignedCourse, cart)].applicants.push({UTORid: assignment.assignedApplicant});
        //             } else {
        //                 // otherwise create a new entry
        //                 cart.push({code: assignment.assignedCourse, applicants: [{UTORid:assignment.assignedApplicant}] });
        //             }
        //         }

        //         t.setState({
        //             courseCarts: cart
        //         });
        //     })
        //     .catch(function(error) {
        //         throw error;
        // });

       t.setState({
           courses: [
               {code: "CSC108", title: "Introduction to Computer Programming", numberOfTAs: 40, qualifications: "CSC108"},
               {code: "CSC148", title: "Introduction to Computer Science", numberOfTAs: 20, qualifications: "CSC108, CSC148"},
               {code: "CSC207", title: "Software Design",numberOfTAs: 12, qualifications: "CSC207"},
               {code: "CSC343", title: "Introduction To Databases",numberOfTAs: 1, qualifications: "CSC207"},        
           ],
           courseCarts: [
               {code: "CSC108", applicants: [{UTORid: "atheed12"}, {UTORid: "manoha56"} ]},
               {code: "CSC207", applicants: [{UTORid: "atheed12"}]}
           ]
       });


     } 

    // to check if a course is already in the list
    contains(code, cart) {
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
        if (! this.contains(code, carts)) {
            carts.push({code: code, applicants: [{UTORid:student}] });
        } else {
            // find out if the student is already in the cart for this course
            // if they are, that means they just got rejected
            var currentCart = carts[this.index(code, carts)];

            var index = this.getIndex(currentCart.applicants, student);
            if (index > -1) {
                currentCart.applicants.splice(index, 1);
            } else {
                // this student is not in the cart, so add them
                currentCart.applicants.push({UTORid: student});
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
            if (item.UTORid === student) {
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
    courseList() {
      this.state.courses.map(function(course) {
        return <Course key={course.code} code={course.code} title={course.title}  numberOfTAs={course.numberOfTAs}
                            qualifications={course.qualifications}/>
      });
    }

    render() {
        return (
            <div>
                <Collapsible>
                    {this.state.courses.map(course =>
                        <Course key={course.code}
                                code={course.code}
                                title={course.title}
                                numberOfTAs={course.numberOfTAs}
                                qualifications={course.qualifications}
                                currentlyAssigned={this.state.courseCarts[this.index(course.code, this.state.courseCarts)]}
                                onChange={this.toggleCart.bind(this)}
                        />
                        )
                    }
                </Collapsible>
                <div>
                    {this.state.courseCarts.map(cart =>
                        <div key={cart.code}>
                            <h3>{cart.code}</h3>
                            {cart.applicants.map(applicant =>
                            <p key={applicant.UTORid}>{applicant.UTORid}</p>
                            )}
                        </div>)}
                </div>
            </div>
        )    
    }
}