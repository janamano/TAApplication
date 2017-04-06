import React, { Component } from 'react';
import { Row, Button } from "react-materialize";
import 'whatwg-fetch';

import Nav from './Nav';
import RankGroup from './RankGroup';

let utils = require('../utils.js');
let json = utils.json;
let courseCompare = utils.courseCompare; 

export default class Cart extends Component {
    constructor(props) {
        super(props);

        const studentNumber = props.location.state.studentNumber;
        const UTORid = props.location.state.UTORid;
        const submitted = props.location.state.submitted;

        this.state = {
            studentNumber: studentNumber,
            UTORid: UTORid,
            coursesInCart: [],
            rankings: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                0: []
            },
            allCourses: [],
            submitted: submitted
        }

        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.refreshRankGroups = this.refreshRankGroups.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        var t = this;

        let coursePrefs = [];

        fetch('/all-courses', { method: 'GET' })
            .then(json)
            .then(function(data) {
                const courses = data.data;
                t.setState({
                    allCourses: courses.map(function(obj) {
                        return {code: obj.code, title: obj.title}
                    })
                });

                fetch('/get-rankings?utorid=' + t.state.UTORid, { method: 'GET' })
                    .then(json)
                    .then(function(data) {
                        coursePrefs = data.data;

                        // copy of state rankings
                        let rankings = JSON.parse(JSON.stringify(t.state.rankings));

                        // copy of state coursesInCart
                        let coursesInCart = t.state.coursesInCart.slice();

                        if (typeof coursePrefs !== 'undefined' && coursePrefs.length == 0) {
                            return;
                        } else {
                            coursePrefs = coursePrefs[0].coursePref;

                            // examine every course-preference and update accordingly
                            coursePrefs.map(function(course) {
                                // index of course in allCourses list
                                const index = t.state.allCourses.findIndex(item => item.code === course.courseCode);

                                // update coursesInCart to have all the courses in the cart, and their associated titles
                                coursesInCart.push({
                                    code: course.courseCode, 
                                    title: t.state.allCourses[index].title
                                });

                                // update rankings to have all the courses in the cart (at the correct position based
                                // on rank), and their titles
                                rankings[String(course.rank)].push({
                                    code: course.courseCode, 
                                    title: t.state.allCourses[index].title
                                });
                            });

                            // sort courses alphabetically for ease-of-use
                            for (var i = 0; i < 6; i++) {
                                rankings[String(i)].sort(courseCompare);
                            }

                            t.setState({
                                rankings: rankings,
                                coursesInCart: coursesInCart
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

    refreshRankGroups(oldRank, newRank, code) {
        // index of course being moved
        const index = this.state.rankings[oldRank].findIndex(item => item.code === code);

        // course being moved
        const course = this.state.rankings[oldRank][index];

        // remove course from old rank group
        let oldRankCourses = this.state.rankings[oldRank].slice();
        oldRankCourses.splice(index, 1);

        // replace old rank group with new version
        let newRankings = this.state.rankings;
        newRankings[oldRank] = oldRankCourses;

        // if the course has actually been deleted, we call newRank as -1. in this 
        // case, we just set rankings to be the rankings without the old course (without
        // adding it back in to a new rank group)
        if (newRank === -1) {
            this.setState({
                rankings: newRankings
            });
        } else {
            // add course to new rank group
            let newRankCourses = this.state.rankings[newRank].slice();
            newRankCourses.push(course);

            // replace new rank group with new version
            newRankings[newRank] = newRankCourses
            this.setState({
                rankings: newRankings
            });
        }
    }

    handleRemove(event, rankToRefresh, code) {
        event.stopPropagation();

        // index of course being removed (from coursesInCart)
        const indexCourses = this.state.coursesInCart.findIndex(item => item.code === code);

        // delete the course (from coursesInCart)
        let courses = this.state.coursesInCart.slice();
        courses.splice(indexCourses, 1);

        // index of course being removed (from state rankings)
        const indexRank = this.state.rankings[String(rankToRefresh)].findIndex(item => item.code === code);
        
        // delete the course (from state rankings)
        let rankings = JSON.parse(JSON.stringify(this.state.rankings));
        rankings[String(rankToRefresh)].splice(indexRank, 1);

        this.setState({
            coursesInCart: courses,
            rankings: rankings
        });

        // refresh groups to not include this course
        this.refreshRankGroups(rankToRefresh, -1, code);
    }

    handleSave() {
        var t = this;

        if (!t.state.submitted) {
            fetch('/save-rankings', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rankings: {
                        1: t.state.rankings[1].map(function(course) { return course.code }),
                        2: t.state.rankings[2].map(function(course) { return course.code }),
                        3: t.state.rankings[3].map(function(course) { return course.code }),
                        4: t.state.rankings[4].map(function(course) { return course.code }),
                        5: t.state.rankings[5].map(function(course) { return course.code }),
                        0: t.state.rankings[0].map(function(course) { return course.code })
                    },
                    utorid: t.state.UTORid,
                    status: false,
                    session: "Fall 2017"
                })
            })
            .then(json)
            .then(function(data) {
                // TODO
            })
            .catch(function(err) {
                throw err;
            });
        }
    }

    handleSubmit() {
        var t = this;

        fetch('/save-rankings', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rankings: {
                    1: t.state.rankings[1].map(function(course) { return course.code }),
                    2: t.state.rankings[2].map(function(course) { return course.code }),
                    3: t.state.rankings[3].map(function(course) { return course.code }),
                    4: t.state.rankings[4].map(function(course) { return course.code }),
                    5: t.state.rankings[5].map(function(course) { return course.code }),
                    0: t.state.rankings[0].map(function(course) { return course.code })
                },
                utorid: t.state.UTORid,
                status: false,
                session: "Fall 2017"
            })
        })
        .then(json)
        .then(function(data) {
            fetch('/submit-application?utorid=' + t.state.UTORid, { method: 'GET' })
                .then(json)
                .then(function(data) {
                    if (data.status === "success") {
                        Materialize.toast('Your application has been submitted', 2000);
                        t.setState({
                            submitted: true
                        })
                    } else {
                        Materialize.toast('An error occurred while submitting', 2000);
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
            marginBottom: '5%',
        }
        var style3 = {
            marginLeft: '40%',
            display: "inline-block"
        }

        return (
            <div>
                <Nav 
                    heading={"Course Cart"} 
                    stunum={this.state.studentNumber} 
                    UTORid={this.state.UTORid}
                    activePage={"Course Cart"}
                />
                {
                    this.state.submitted ?
                    <div>
                        <p className="thin center">
                            <b>You have already submitted your application, and thus can
                            no longer update your details.</b>
                        </p>
                    </div>
                    :
                    null
                }
                <div style={style} className="cart">
                    <RankGroup rank={1} courses={this.state.rankings[1]} 
                        handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups} submitted={this.state.submitted}/>
                    <RankGroup rank={2} courses={this.state.rankings[2]} 
                        handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups} submitted={this.state.submitted}/>
                    <RankGroup rank={3} courses={this.state.rankings[3]} 
                        handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups} submitted={this.state.submitted}/>
                    <RankGroup rank={4} courses={this.state.rankings[4]} 
                        handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups} submitted={this.state.submitted}/>
                    <RankGroup rank={5} courses={this.state.rankings[5]} 
                        handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups} submitted={this.state.submitted}/>
                    <RankGroup rank={0} courses={this.state.rankings[0]} 
                        handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups} submitted={this.state.submitted}/>
                </div>
                <span style={style3}>
                    <Button 
                        waves='light' 
                        onClick={this.handleSave}
                        disabled={this.state.submitted}
                    >
                    Save
                    </Button>
                    &emsp;&emsp;
                    <Button 
                        waves='light'  
                        className="light-blue darken-4" 
                        onClick={this.handleSubmit}
                        disabled={this.state.submitted}
                    >
                    Submit
                    </Button>
                    </span>
                <p></p>
            </div>
        );
    }
}