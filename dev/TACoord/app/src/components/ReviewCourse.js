import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem, Modal, Collection } from "react-materialize";
import ReviewApplicant from './ReviewApplicant';
import { Draggable, Droppable } from 'react-drag-and-drop'


let utils = require('../utils.js');
let json = utils.json;

export default class ReviewCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: this.props.code,
            assignedApplicants: this.props.assignedApplicants,
            courseTitle: "",
            numberOfTAs: 0,
            courseQualifications: ""
        };

        this.getCourseInfo = this.getCourseInfo.bind(this);
        this.removeApplicant = this.removeApplicant.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.incTAs = this.incTAs.bind(this);
    }

    getCourseInfo() {
        var t = this;
        fetch('/getCourse?course=' + t.props.code, {method: 'GET'})
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
    incTAs(value) {
        var t = this;
        let current = t.state.numberOfTAs;
        current += value;
        
        fetch('/changeNumTAs', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: current,
                code: t.state.code
            })
        })
        .then(json)
        .then(function(data) {
            t.setState({
                numberOfTAs: current
            });
        })
        .catch(function(error) {
            throw error;
        });
    }
    removeApplicant(number) {
        var t = this;
        // reject applicant
        fetch('/reject', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentNumber: number,
                    courseCode: t.state.code
                })
            })
            .then(json)
            .then(function(data) {
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
                t.incTAs(1);
                // if the last of the applicants were removed, then remove this course's cart
                if (applicants.length == 0) {
                    t.props.removeCourse(t.state.code);
                }

            })
            .catch(function(error) {
                throw error;
            });
    }

    onDrop(studentNumber) {
        var t = this;
        // var cart = t.state.applicantsCart;
        // var index = t.getIndex(cart, studentNumber.applicantc);

        t.removeApplicant(studentNumber.applicant);
        Materialize.toast("Removed applicant from " + t.state.code, 3000);

    }
    render() {
        var style = {
            textAlign: 'left'
        }
        return (

            <CollapsibleItem onClick={this.getCourseInfo} style={style} header={this.props.code}>
                <Droppable types={['applicant']} onDrop={this.onDrop.bind(this)}>
                    <p>Course Code: {this.state.code}</p>
                    <p>Title: {this.state.courseTitle}</p>
                    <p>Number of TAs: {this.state.numberOfTAs}</p>
                    <p>Qualifications: {this.state.courseQualifications}</p>
                </Droppable>
                <Collapsible>
                    <CollapsibleItem header="View Applicants">
                        <Collection>
                            {this.state.assignedApplicants.map(applicant =>
                               <Draggable key={applicant.studentNumber}
                                          data={applicant.studentNumber}
                                          type='applicant' >
                                    <ReviewApplicant    studentNumber={applicant.studentNumber}
                                                        removeApplicant={this.removeApplicant}
                                                        />
                                </Draggable>
                            )}
                        </Collection>
                    </CollapsibleItem>
                </Collapsible>
            </CollapsibleItem>  

        )
    }
}