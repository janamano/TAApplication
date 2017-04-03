import React, { Component } from 'react';
import { Row, Input, Button, CollectionItem, Collection } from "react-materialize";
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
            TAHistory: []
        }

        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCoursesTAdList = this.updateCoursesTAdList.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.handleTimesChange = this.handleTimesChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    addCourse(course) {
        // index of course being added
        const index = this.state.TAHistory.findIndex(item => item.courseCode === course);

        // only update history if course has not already been added
        if (index === -1) {
            this.setState({ 
                TAHistory: this.state.TAHistory.concat([{courseCode: course, timesTAd: 0}])
            });
        }
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

    handleTimesChange(event, code) {
        let TAHistory = this.state.TAHistory.slice();

        // index of course being manipulated
        const index = TAHistory.findIndex(item => item.courseCode === code);
        TAHistory[index].timesTAd = event.target.value;
        this.setState({
            TAHistory: TAHistory
        });
    }

    handleRemove(event, code) {
        // index of course being removed
        const index = this.state.TAHistory.findIndex(item => item.courseCode === code);

        // remove course from old rank group
        let TAHistory = this.state.TAHistory.slice();
        TAHistory.splice(index, 1);

        this.setState({
            TAHistory: TAHistory
        })
    }
 
    render() {
        var style = {
            zIndex: 1
        };

        var style2 = {
            textAlign: 'center',
            //width: '60%',
            margin: 'auto',
            marginLeft: "45%"
        };

        var style3 = {
            fontSize: '1.4em'
        }

        var style4 = {
            textAlign: 'center',
            width: '4%',
            marginLeft: '5%',
            display: "inline-block",
        };

        var style5 = {
            marginLeft: "42%",
            //paddingTop: "5%"
        }

        var style6 = {
            textAlign: 'center',
        }

        var t = this;
        let experience = this.state.TAHistory.map(function(obj) {
            return (
                <CollectionItem key={obj.courseCode}>
                    <span className={"thin"} style={style5}>{obj.courseCode}</span>
                    <div style={style4}>
                        <Input s={6} style={style6}
                            ref="numTAd"
                            required 
                            defaultValue={obj.timesTAd}
                            onChange={(evt) => t.handleTimesChange(evt, obj.courseCode)}
                        />
                    </div>
                    &emsp;&emsp;&emsp;&emsp;
                    <Button onClick={(evt) => t.handleRemove(evt, obj.courseCode)} className="blue-grey darken-4 waves-effect waves-light"> Remove Course </Button>
                </CollectionItem>
            )
        });

        return (
            <div>
                <Nav 
                    heading={"Applicant History"} 
                    stunum={this.state.studentNumber} 
                    UTORid={this.state.UTORid}
                    activePage={"Applicant History"}
                />
                <p />
                <p style={style3} className='thin center'><b>Add courses TA'd in the past</b>: </p>
                <AutosuggestBox addCourse={this.addCourse}/>
                {
                    (t.state.TAHistory.length > 0) 
                    ? 
                    <div>
                        <span className={"thin"}style={style5}><b>Course</b></span> &emsp;&emsp;
                        <span className={"thin"}><b>Number of Times TA'd</b></span>
                        <Collection>
                            {experience}
                        </Collection>
                    </div> 
                    :
                    null
                }
                <p />
                <Button waves='light' style={style2} onClick={this.handleSubmit}>Enter</Button>
            </div>
        );
    }
}