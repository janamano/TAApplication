import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem } from "react-materialize";


let applicantsCart = [];

export default class Course extends Component {
    constructor() {
        super();

        this.state = {
            applicants: []
        };


        //this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    // componentDidMount() {
    //     var t = this;
    //     t.setState = {
    //         applicants = [{studentNumber: 12345,   UTORid: "manoha56",
    //                        lastName: "Manoharan", firstName: "Janarthanan",
    //                        phoneNumber: "4161231234", email: "jana@gmail.com",
    //                        studentInformation: {programLevel: "Undergraduate",
    //                                             year: 3,
    //                                             programName: "Computer Science",
    //                                             workStatus: "Legally Entitled",
    //                                             studenStatus: True,  
    //                                             academicHistory: [{
    //                                                                 courseCode : "CSCA08",
    //                                                                 grade : 96          
    //                                                               },
    //                                                               { 
    //                                                                 courseCode: "CSCA48",
    //                                                                 grade: 90
    //                                                               }],
    //                                             TAHistory: [{
    //                                                          courseCode: "CSCA08",
    //                                                          timesTAd: 1
    //                                                         },
    //                                                         {
    //                                                          courseCode: "CSCA48",
    //                                                          timesTAd: 2
    //                                                         }]
    //                                             }
    //                     },
    //                     {studentNumber: 12215,   UTORid: "atheed12",
    //                        lastName: "Thameem", firstName: "Atheed",
    //                        phoneNumber: "4163231234", email: "Atheed@gmail.com",
    //                        studentInformation: {programLevel: "Undergraduate",
    //                                             year: 4,
    //                                             programName: "Computer Science",
    //                                             workStatus: "Legally Entitled",
    //                                             studenStatus: True,  
    //                                             academicHistory: [{
    //                                                                 courseCode : "CSCA08",
    //                                                                 grade : 96          
    //                                                               },
    //                                                               { 
    //                                                                 courseCode: "CSCA48",
    //                                                                 grade: 90
    //                                                               }],
    //                                             TAHistory: [{
    //                                                          courseCode: "CSCA08",
    //                                                          timesTAd: 1
    //                                                         },
    //                                                         {
    //                                                          courseCode: "CSCA48",
    //                                                          timesTAd: 2
    //                                                         }]
    //                                             }
    //         }]
    //     }
    // }
    

    render() {
        let head = this.props.code + ": " + this.props.title;
        return (

        <CollapsibleItem header={ head }>
                <p>Course Code: {this.props.code}
                   Number of TAs: {this.props.numberOfTAs}
                   Qualifications: {this.props.qualifications}</p>
                
                <Collapsible>
                    <Button class='red' waves="light">View Applicants</Button>

                </Collapsible>
                
                
            </CollapsibleItem>
        )
    }
}