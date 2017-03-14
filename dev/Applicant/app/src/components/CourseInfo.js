import React, { Component } from 'react';
import { Row, Button } from "react-materialize";

export default class CourseInfo extends Component {
    constructor() {
        super();

        this.state = {
            instructor: null,
            numberOfTAs: null,
            qualifications: null,
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var t = this;

        /* 
        TODO: once course-info API is built, implement this fetch() 
        fetch('/course-info?course=' + this.props.code, { method: 'GET' })
            .then(json)
            .then(function(data) {
                const courses = data.data;
                t.setState({
                    instructor: courses.instructor,
                    numberOfTAs: courses.numberoftas,
                    qualifications: courses.qualifications,
                });
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
        */

        // Until then...
        t.setState({
            instructor: "Danny Heap",
            numberOfTAs: 50,
            qualifications: "Proficiency in Python and object-oriented programming",
        });
    }

    render() {
        const { instructor, numberOfTAs, qualifications } = this.state;

        return (
            <div className="course-info">
                <div>
                <span className="course-info-span">Instructor:</span> {instructor}
                </div>
                <div>
                <span className="course-info-span">Number of TAs:</span> {numberOfTAs}
                </div>
                <div>
                <span className="course-info-span">Qualifications:</span> {qualifications}
                </div>
            </div>
        );
    }
}

CourseInfo.propTypes = {
    code: React.PropTypes.string,           // course code
};