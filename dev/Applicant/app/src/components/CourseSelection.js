import React, { Component } from 'react';
import { Button, Collapsible, CollapsibleItem } from "react-materialize";
import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import Course from './Course';
import Nav from './Nav';

let utils = require('../utils.js');
let json = utils.json;
let courseCompare = utils.courseCompare; 

let coursesinCart = [];

export default class CourseSelection extends Component {
    constructor(props) {
        super(props);

        const studentNumber = props.location.state.studentNumber;
        const UTORid = props.location.state.UTORid;
        this.state = {
            UTORid: UTORid,
            studentNumber: studentNumber,
            courses: [],
            rankings: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                0: []
            }
        };

        this.componentWillMount = this.componentWillMount.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.filterCoursePrefs = this.filterCoursePrefs.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    addToCart(course) {
        coursesinCart.push(course);

        // add course to state rankings
        const newList = this.state.rankings['0'].slice();
        newList.push({
            courseCode: course,
            rank: 0
        });
        this.setState({
            rankings: {
                1: this.state.rankings['1'],
                2: this.state.rankings['2'],
                3: this.state.rankings['3'],
                4: this.state.rankings['4'],
                5: this.state.rankings['5'],
                0: newList
            }
        })
    }

    removeFromCart(course) {
        var delIdx = coursesinCart.indexOf(course);
        if (delIdx > -1) {
            coursesinCart.splice(delIdx, 1);
        }
        
        // copy of state rankings
        let rankings = JSON.parse(JSON.stringify(this.state.rankings));

        // delete course from rank that it belongs to (in the copied object)
        for (var i = 0; i < 6; i++) {
            // index of course being deleted
            const delIdx = rankings[i].findIndex(item => item.courseCode === course);
            if (delIdx > -1) {
                rankings[i].splice(delIdx, 1);
                break;
            }
        }

        this.setState({
            rankings: rankings
        })
    }

    componentWillMount() {
        var t = this;
        fetch('/all-courses', { method: 'GET' })
            .then(json)
            .then(function(data) {
                const courses = data.data;
                let coursePrefs = [];
                courses.sort(courseCompare);

                fetch('/get-rankings?utorid=' + t.state.UTORid, { method: 'GET' })
                    .then(json)
                    .then(function(data) {
                        coursePrefs = data.data;

                        // if course preferences are empty (i.e. they have not added any course preferences
                        // yet, or have not done this step of the process before), then we set all the courses
                        // to not be in the cart
                        if (typeof coursePrefs !== 'undefined' && coursePrefs.length == 0) {
                            t.setState({
                                courses: courses.map(function(obj){
                                    return {code: obj.code, title: obj.title, inCart: false}
                                }),
                                rankings: {
                                    1: [],
                                    2: [],
                                    3: [],
                                    4: [],
                                    5: [],
                                    0: [],
                                }
                            });
                        } else {
                            coursePrefs = data.data[0].coursePref;
                            t.setState({
                                courses: courses.map(function(obj) {
                                    return {
                                        code: obj.code, 
                                        title: obj.title, 
                                        // if course preference list does not include this course, then it is not in the cart.
                                        // else, it is in the cart
                                        inCart: coursePrefs.findIndex(item => item.courseCode === obj.code) === -1 ? false : true
                                    }
                                }),
                                rankings: {
                                    1: t.filterCoursePrefs(coursePrefs, 1),
                                    2: t.filterCoursePrefs(coursePrefs, 2),
                                    3: t.filterCoursePrefs(coursePrefs, 3),
                                    4: t.filterCoursePrefs(coursePrefs, 4),
                                    5: t.filterCoursePrefs(coursePrefs, 5),
                                    0: t.filterCoursePrefs(coursePrefs, 0),
                                }
                            });
                        }
                    })
                    .catch(function(err) {
                        throw err;
                    });
            })
            .catch(function(err) {
                throw err;
            });
    }

    /*
    Function that filters the course-preferences list to only include the courses 
    of the given 'rank' (i.e. preference)
    */
    filterCoursePrefs(coursePrefList, rank) {
        return coursePrefList.filter(function(elem) {
            return elem.rank === rank
        });
    }

    handleSave() {
        var t = this;

        fetch('/save-rankings', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rankings: t.state.rankings,
                    rankings: {
                        1: this.state.rankings['1']
                            .map(function(course) { return course.courseCode }),
                        2: this.state.rankings['2']
                            .map(function(course) { return course.courseCode }),
                        3: this.state.rankings['3']
                            .map(function(course) { return course.courseCode }),
                        4: this.state.rankings['4']
                            .map(function(course) { return course.courseCode }),
                        5: this.state.rankings['5']
                            .map(function(course) { return course.courseCode }),
                        0: this.state.rankings['0']
                            .map(function(course) { return course.courseCode }),
                    },
                    utorid: t.state.UTORid,
                    status: false,
                    session: "Fall 2017"
                })
            })
            .then(json)
            .then(function(data) {
                // Until then...
                hashHistory.push({
                    pathname: `/cart`,
                    state: { 
                        UTORid: t.state.UTORid,
                        studentNumber: t.state.studentNumber,
                    }
                });
            })
            .catch(function(err) {
                throw err;
            });
    }
 
    render() {
        var style = {
            textAlign: 'center',
            width: '60%',
            margin: 'auto',
            marginBottom: '5%'
        };
        var style2 = {
            textAlign: 'center',
            marginLeft: '45%',
        }
        return (
            <div>
                <Nav 
                    heading={"Course Selection"} 
                    stunum={this.state.studentNumber} 
                    UTORid={this.state.UTORid}
                    activePage={"Course Selection"}
                />
                <Collapsible style={style}>
                    {this.state.courses.map(course =>
                            <Course key={course.code} 
                                    code={course.code} 
                                    title={course.title}
                                    addToCart={this.addToCart}
                                    removeFromCart={this.removeFromCart}
                                    inCart={course.inCart}
                            />
                        )
                    }
                </Collapsible>
                <Button style={style2} waves='light' onClick={this.handleSave}>Enter</Button>
            </div>
        );
    }
}