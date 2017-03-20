import React, { Component } from 'react';
import { Row, Button } from "react-materialize";
import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import AutosuggestBox from './AutosuggestBox';
import Nav from './Nav';

var utils = require('../utils.js');
var json = utils.json;
let courseCompare = utils.courseCompare; 

let coursesTAd = [];

export default class ApplicantHistory extends Component {
    constructor(props) {
        super(props);

        const studentNumber = props.location.state.studentNumber;
        const UTORid = props.location.state.UTORid;
        this.state = {
            UTORid: UTORid,
            studentNumber: studentNumber,
            allCourses: [],
            TAHistory: []
        }

        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCoursesTAdList = this.updateCoursesTAdList.bind(this);
    }

    componentWillMount() {
        var t = this;

        const history = this.props.location.state.TAHistory;
        coursesTAd = history.map(function(obj){
            return {value: obj.courseCode, label: obj.courseCode}
        });
        t.setState({
            TAHistory: history
        })

        fetch('/all-courses', { method: 'GET' })
            .then(json)
            .then(function(data) {
                const courses = data.data;
                courses.sort(courseCompare);
                t.setState({
                    allCourses: courses.map(function(obj){
                        return {value: obj.code, label: obj.code}
                    })
                });
            })
            .catch(function(err) {
                throw err;
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        var t = this;

        // make form submit (POST) request
        fetch("/save-TA-history", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentNumber: t.state.studentNumber,
                    UTORid: t.state.UTORid,
                    TAHistory: t.state.TAHistory
                })
            })
            .then(json)
            .then(function(data) {
                // TODO: later, check for success first
                hashHistory.push({
                    pathname: `/courseselection`,
                    state: { 
                        UTORid: t.state.UTORid,
                        studentNumber: t.state.studentNumber,
                    }
                })
            })
            .catch(function(err) {
                throw err;
            });
    }

    updateCoursesTAdList(selected) {
        var t = this;

        let newCoursesState = [];
        if (selected != "") {
            newCoursesState = selected.split(",");
        }

        t.setState({
            TAHistory: []
        })

        let newHistory = [];

        newCoursesState.map(function(obj) {
            let newCourse = {};

            coursesTAd.push({
                value: obj,
                label: obj
            });
            newHistory.push({
                courseCode: obj,
                timesTAd: 1
            });
        });

        t.setState({
            TAHistory: newHistory
        })
    }
 
    render() {
        var style = {
            zIndex: 1
        };

        var style2 = {
            textAlign: 'center',
            width: '60%',
            margin: 'auto',
        };

        var style3 = {
            fontSize: '1.4em'
        }

        return (
            <div>
                <Nav heading="Applicant History"/>
                <p />
                <form style={style2} onSubmit={this.handleSubmit}>
                    <p style={style3} className='thin'><b>Enter courses TA'd in the past</b>: </p>
                    <Row>
                        <AutosuggestBox 
                            style={style}
                            onSelectOption={this.updateCoursesTAdList}
                            selected={(coursesTAd.length === 0) ? "" : 
                                coursesTAd.map(function(obj) {
                                    return obj.value
                                }).join(",")}
                            options={this.state.allCourses}
                            placeholder={"Search courses"}
                        />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Button waves='light' style={style} type="submit">Enter</Button>
                    </Row>
                </form>
            </div>
        );
    }
}