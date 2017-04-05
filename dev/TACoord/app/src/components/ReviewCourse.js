import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem, Modal, Collection } from "react-materialize";
import ReviewApplicant from './ReviewApplicant';

let utils = require('../utils.js');
let json = utils.json;

export default class ReviewCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseCode: this.props.code,
            assignedApplicants: this.props.assignedApplicants,
            courseTitle: "",
            numberOfTAs: 0,
            courseQualifications: ""
        };

        this.getCourseInfo = this.getCourseInfo.bind(this);
        this.removeApplicant = this.removeApplicant.bind(this);
    }

    getCourseInfo() {
        var t = this;
        fetch('/getCourse?course=' + t.state.courseCode, {method: 'GET'})
        .then(json)
        .then(function(data) {
            if (data.status === 'success') {
                var course = data.data[0]
                t.setState({
                    courseTitle: course.title,
                    numberOfTAs: course.numberOfTAs,
                    courseQualifications: course.qualifications
                });
            }
        })
        .catch(function(err) {
            throw err;
        });
    }

    removeApplicant(number) {
        var t = this;
        // reject applicant
        
        var applicants = t.state.assignedApplicants;
        var index = 0;
        while(index < applicants.length && applicants[index].studentNumber != number) { 
            index++;
        }
        applicants.splice(index, 1);
        // remove tha applicant from the list of assignments
        t.setState({
            assignedApplicants: applicants
        });

        // if the last of the applicants were removed, then remove this course's cart
        if (applicants.length == 0) {
            this.props.removeCourse(t.state.courseCode);
        }

    }   
    render() {
        var style = {
            textAlign: 'left'
        }
        return (
            <CollapsibleItem onClick={this.getCourseInfo} style={style} header={this.state.courseCode}>
                <p>Course Code: {this.state.courseCode}</p>
                <p>Title: {this.state.courseTitle}</p>
                <p>Number of TAs: {this.state.numberOfTAs}</p>
                <p>Qualifications: {this.state.courseQualifications}</p>
                <Collapsible>
                    <CollapsibleItem header="View Applicants">
                        <Collection>
                            {this.state.assignedApplicants.map(applicant =>
                                <ReviewApplicant key={applicant.studentNumber}
                                                    studentNumber={applicant.studentNumber}
                                                    removeApplicant={this.removeApplicant}
                                                    />
                            )}
                        </Collection>
                    </CollapsibleItem>
                </Collapsible>
            </CollapsibleItem>  

        )
    }
}