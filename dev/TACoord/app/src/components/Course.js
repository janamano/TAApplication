import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem, Modal } from "react-materialize";
import Applicant from './Applicant';

let applicantsCart = [];

export default class Course extends Component {
    constructor() {
        super();

        this.state = {
            applicants: []
        };


        this.componentWillMount = this.componentWillMount.bind(this);
    }
    
    componentWillMount() {
        var t = this;
        t.setState({
            applicants: [{ studentNumber: 12345,   UTORid: "manoha56", lastName: "Manoharan", firstName: "Janarthanan", phoneNumber: "4161231234", email: "jana@gmail.com",
            studentInformation: {programLevel: "Undergraduate", year: 3, programName: "Computer Science", workStatus: "Legally Entitled", studentStatus: 'True', 
            academicHistory: [{courseCode : "CSCA08", grade : 96}, {courseCode: "CSCA48", grade: 90}],
            TAHistory: [{courseCode: "CSCA08", timesTAd: 1}, {courseCode: "CSCA48", timesTAd: 2}]} },
                        {studentNumber: 12215,   UTORid: "atheed12", lastName: "Thameem", firstName: "Atheed", phoneNumber: "4163231234", email: "Atheed@gmail.com",
                        studentInformation: {programLevel: "Undergraduate", year: 4, programName: "Computer Science", workStatus: "Legally Entitled", studentStatus: 'True', 
                        academicHistory: [{courseCode : "CSCA08", grade : 96}, {courseCode: "CSCA48", grade: 90}], 
                        TAHistory: [{courseCode: "CSCA08", timesTAd: 1},{courseCode: "CSCA48", timesTAd: 2}]} }]
        });
    }
    

    render() {
        let head = this.props.code + ": " + this.props.title;
        return (

        <CollapsibleItem header={ head }>
                <p>Course Code: {this.props.code}
                   Title: {this.props.title}
                   Number of TAs: {this.props.numberOfTAs}
                   Qualifications: {this.props.qualifications}
                   </p>
                  
                <Collapsible>
                    <CollapsibleItem header="View Applicants">
                        {this.state.applicants.map(applicant =>
                            <Applicant key={applicant.studentNumber}
                                       firstName={applicant.firstName}
                                       lastName={applicant.lastName}
                                       studentNumber={applicant.studentNumber}
                                       phoneNumber={applicant.phoneNumber}
                                       email={applicant.email}
                                       programLevel={applicant.studentInformation.programLevel}
                                       programName={applicant.studentInformation.programName}
                                       year={applicant.studentInformation.year}
                                       workStatus={applicant.studentInformation.workStatus}
                                       academicHistory={applicant.academicHistory}
                                       TAHistory={applicant.TAHistory} />
                        )}
                    </CollapsibleItem>
                </Collapsible>
                
                
        </CollapsibleItem>
        )
    }
}