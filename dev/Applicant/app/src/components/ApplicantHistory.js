import React, { Component } from 'react';
import { Row, Button } from "react-materialize";
import AutosuggestBox from './AutosuggestBox';

var utils = require('../utils.js');
var json = utils.json;

let coursesTAd = [];

export default class ApplicantHistory extends Component {
    constructor() {
        super();

        this.state = {
            courses: [],
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
                t.setState({
                    courses: courses.map(function(obj){
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
            zIndex: -1
        };

        return (
            <div>
                <p>Enter courses TA'd in the past: </p>
                <p />
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <AutosuggestBox 
                            style={style}
                            onSelectOption={this.updateCoursesTAdList}
                            selected={""}
                            options={this.state.courses}
                            placeholder={"Search courses"}
                        />
                        <br />
                        <Button waves='light' style={style} type="submit">Enter</Button>
                    </Row>
                </form>
            </div>
        );
    }
}