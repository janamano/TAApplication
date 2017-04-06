import React, { Component } from 'react';
import { Row, Button } from "react-materialize";
import 'whatwg-fetch';

var utils = require('../utils.js');
var json = utils.json;

export default class CourseInfo extends Component {
    constructor() {
        super();

        this.state = {
            instructor: null,
            numberOfTAs: null,
            qualifications: null,
        }

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        var t = this;

        fetch('/course-info?course=' + this.props.code, { method: 'GET' })
            .then(json)
            .then(function(data) {
                const course = data.data[0];
                t.setState({
                    instructor: course.instructor,
                    numberOfTAs: course.numberOfTAs,
                    qualifications: course.qualifications,
                });
            })
            .catch(function(err) {
                throw err;
            });
    }

    render() {
        const { instructor, numberOfTAs, qualifications } = this.state;

        return (
            <div className="course-info">
                <div>
                <span className="course-info-span"><b>Instructor</b>:</span> {instructor}
                </div>
                <div>
                <span className="course-info-span"><b>Number of TAs</b>:</span> {numberOfTAs}
                </div>
                <div>
                <span className="course-info-span"><b>Qualifications</b>:</span> {qualifications}
                </div>
            </div>
        );
    }
}

CourseInfo.propTypes = {
    code: React.PropTypes.string,           // course code
};