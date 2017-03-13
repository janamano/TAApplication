import React, { Component } from 'react';
import { Row, Button } from "react-materialize";
import AutosuggestBox from './AutosuggestBox';

let coursesTAd = [];

export default class ApplicantHistory extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCoursesTAdList = this.updateCoursesTAdList.bind(this);
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
        }
        console.log(coursesTAd);
    }
 
    render() {
        // TODO: once courses API is built, get the courses from there
        let courses = [
            { value: 'CSC108', label: 'CSC108' },
            { value: 'CSC148', label: 'CSC148' },
            { value: 'CSC165', label: 'CSC165' },
            { value: 'CSC207', label: 'CSC207' },
            { value: 'CSC209', label: 'CSC209' },
            { value: 'CSC236', label: 'CSC236' },
            { value: 'CSC263', label: 'CSC263' }
        ];

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
                            options={courses}
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