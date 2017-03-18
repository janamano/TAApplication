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
        this.state = {
            studentNumber: studentNumber,
            allCourses: [],
        }

        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCoursesTAdList = this.updateCoursesTAdList.bind(this);
    }

    componentWillMount() {
        var t = this;
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

        const history = this.props.location.state.TAHistory;
        coursesTAd = history.map(function(obj){
            return {value: obj.courseCode, label: obj.courseCode}
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        /*
        TODO: Once submit back-end route is complete, implement this fetch() call
              fully 

        // make form submit (POST) request
        fetch("/API", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CoursesTAd: coursesTAd
                })
            })
            .then(json)
            .then(function(data) {
                if (data.status == "success")
                    hashHistory.push('/NEWPAGE');
            })
            .catch(function(err) {
                console.log(err);
                throw err;
            });
        */

        // Until then...
        hashHistory.push({
            pathname: `/courseselection`,
            state: { 
                studentNumber: this.state.studentNumber,
            }
        });
    }

    updateCoursesTAdList(selected) {
        if (selected != "") {
            coursesTAd = selected.split(",");
        } else {
            coursesTAd = [];
        }
    }
 
    render() {
        var style = {
            zIndex: 1
        };

        return (
            <div>
                <Nav heading="Applicant History"/>
                <p>Enter courses TA'd in the past: </p>
                <p />
                <form onSubmit={this.handleSubmit}>
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