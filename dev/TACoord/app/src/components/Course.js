import React, { Component } from 'react';
import { Row,
         Col,
         Button,
         Collapsible,
         CollapsibleItem,
         Modal,
         Collection,
         CollectionItem } from "react-materialize";
import Applicant from './Applicant';
import Filter from './Filter';
import { Draggable, Droppable } from 'react-drag-and-drop'


let utils = require('../utils.js');
let json = utils.json;

export default class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicants: [],
            applicantsCart: [],
            numberOfTAs: props.numberOfTAs,
            code: this.props.code,
            showCart: false
        };


        this.componentWillMount = this.componentWillMount.bind(this);
        this.toggleCart = this.toggleCart.bind(this);
        this.incTAs = this.incTAs.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.isAssigned = this.isAssigned.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.toggleApplicantCart = this.toggleApplicantCart.bind(this);
        this.onDrop = this.onDrop.bind(this);
        
    }
    
    componentWillMount() {
        var t = this;
        
        // get all the applicants who applied to this course
        var query = '/getApplicants?course=' + t.state.code;
        fetch(query, {method: 'GET'})
            .then(json)
            .then(function(data) {
                // store this in the state courses to create course objects
                const applicants = data.data;
                t.setState({
                    applicants: applicants.map(function(applicant) {
                        return {UTORid: applicant.UTORid,
                                studentNumber: applicant.studentNumber,
                                lastName: applicant.lastName,
                                firstName: applicant.firstName,
                                phoneNumber: applicant.phoneNumber,
                                email: applicant.email,
                                studentInformation: applicant.studentInformation}
                    })
                });
            })
            .catch(function(err) {
            // fetch didnt work
            throw err;
        });

        fetch('/getAssignments?course='+this.props.code, {method :'GET'})
        .then(json)
        .then(function(data) {
            if (data.status === 'success') {
                const applicants = data.data;
                t.setState({
                    applicantsCart: applicants.map(function(applicant) {
                        return {UTORid: applicant.UTORid,
                                studentNumber: applicant.studentNumber,
                                lastName: applicant.lastName,
                                firstName: applicant.firstName,
                                phoneNumber: applicant.phoneNumber,
                                email: applicant.email,
                                studentInformation: applicant.studentInformation}
                    })
                });
            }
        })
        .catch(function(err) {
            throw err;
        });
    }

    toggleCart(student) {
        var t = this;
        var cart = t.state.applicantsCart;
        var index = this.getIndex(cart, student.studentNumber);
    
        if (index > -1) {
            // if the student is in the cart, remove them
            // this means that this applicant was just rejected
            // fetch('/API', {
            //     method: 'DELETE',
            //     credentials: 'include',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         applicant: student.studentNumber,
            //         course: t.state.code
            //     })
            // })
            // .then(json)
            // .then(function(data) {
            //     cart.splice(index, 1);
            //     this.setState({
            //         applicantsCart: cart
            //     }); 
            // })
            // .catch(function(error) {
            //     throw error;
            // });

        } else {
            // otherwise add the student to cart
            fetch('/createAssignment', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    course: t.state.code,
                    applicant: student.studentNumber,
                    hour: 65
                })
            })
            .then(json)
            .then(function(data) {
                cart.push(student);
                this.setState({
                     applicantsCart: cart
                }); 
           })
            .catch(function(error) {
                throw error;
            });

        }
    }
    
    // get the index of given student
    getIndex(list, student) {
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            console.log(item.studentNumber)
            console.log(student)            
            if (item.studentNumber == student) {
              return i;
            }
        }   
        return -1;
    }

    // to check if an applicat is currently assigned to this course
    isAssigned(applicant) {
        var t = this;
        var cart = this.state.applicantsCart;
        if (! cart) {
            // not assigned
            return "ACCEPT";
        } else {
            // there is a cart for this course
            var index = this.getIndex(cart, applicant);
            if (index > -1) {
                return "REJECT"; // REJECT
            } else {
                return "ACCEPT";
            }
        }
    }

    setFilter(grad, taed) {
        var t = this;
        var constructQuery = "?query=";
        //query=grad;takenPreq;TAed=CSC108
        if (grad && taed) {
            constructQuery += "grad;TAed=" + this.props.code;
        } else if (grad) {
            constructQuery += "grad";            
        } else if (taed) {
            constructQuery += "TAed=" + this.props.code;                        
        }
        if (constructQuery === '?query=') {
            var query = '/getApplicants?course=' + t.state.code;
            fetch(query, {method: 'GET'})
                .then(json)
                .then(function(data) {
                    // store this in the state courses to create course objects
                    const applicants = data.data;
                    t.setState({
                        applicants: applicants.map(function(applicant) {
                            return {UTORid: applicant.UTORid,
                                    studentNumber: applicant.studentNumber,
                                    lastName: applicant.lastName,
                                    firstName: applicant.firstName,
                                    phoneNumber: applicant.phoneNumber,
                                    email: applicant.email,
                                    studentInformation: applicant.studentInformation}
                        })
                    });
                })
                .catch(function(err) {
                // fetch didnt work
                throw err;
            });

        } else {
            var finalQuery = constructQuery + "&courseUC=" + this.state.code;
            // make fetch call
            fetch('/filter' + finalQuery, {method: 'GET'})
                .then(json)
                .then(function(data) {
                    // store this in the state courses to create course objects
                    const applicants = data.data;
                    console
                    t.setState({
                        applicants: applicants.map(function(applicant) {
                            return {UTORid: applicant.UTORid,
                                    studentNumber: applicant.studentNumber,
                                    lastName: applicant.lastName,
                                    firstName: applicant.firstName,
                                    phoneNumber: applicant.phoneNumber,
                                    email: applicant.email,
                                    studentInformation: applicant.studentInformation}
                        })
                    });
                })
                .catch(function(err) {
                // fetch didnt work
                throw err;
            });
        }
    }

    incTAs(value) {
        let current = this.state.numberOfTAs;
        current += value;
        this.setState({
            numberOfTAs: current
        });
        
    } 

    toggleApplicantCart() {
        var t = this;
        var show = this.state.showCart == true;
        show = !show;
        t.setState({
            showCart: show
        });
    }   
    onDrop(studentNumber) {
        console.log()
        var t = this;
        var cart = t.state.applicantsCart;
        var index = t.getIndex(cart, studentNumber.applicant);

        if (index > -1) {
            Materialize.toast("Applicant already in " + t.state.code, 3000);
        } else {
            // get the other information about the student
            fetch('/getApplicantInfo?studentNumber=' +studentNumber.applicant, {method: 'GET'})
            .then(json)
            .then(function(data) {
                const applicant = data.data;
                t.toggleCart(applicant);
                Materialize.toast("Added applicant to " + t.state.code, 3000);

            })
            .catch()
        }
    } 

    render() {
        let head = this.props.code + ": " + this.props.title;
        var style = {
            textAlign: 'left'
        }
        return (

        <CollapsibleItem style={style} header={ head }>
                <p>Course Code: {this.props.code}</p>
                <p>Title: {this.props.title}</p>
                <p>Number of TAs: {this.state.numberOfTAs}</p>
                <p>Qualifications: {this.props.qualifications}</p>
                <Collapsible>
                    <CollapsibleItem header="View Applicants">
                        <Row>
                            <Col s={8}>
                                <Filter setFilter={this.setFilter.bind(this)} />
                            </Col>
                            <Col s={4}>
                                <Button className='waves-effect btn blue darken-3' onClick={this.toggleApplicantCart.bind(this)} >Cart</Button>
                            </Col>
                        </Row>
                        <Row>           
                            <Col s={6}>
                                <h5 className="light">Applicants</h5>
                                <Collection>
                                {this.state.applicants.map(applicant =>
                                    <Draggable key={applicant.studentNumber}
                                               type='applicant'
                                               data={applicant.studentNumber} >
                                               <Applicant 
                                                    applicantInfo={applicant}
                                                    prompt={this.isAssigned.bind(this)}
                                                    courseUnderConsideration={this.state.code}
                                                    toggleFunction={this.toggleCart.bind(this)}                                
                                                    numTAFunction={this.incTAs.bind(this)}
                                                    numberOfTAs={this.state.numberOfTAs} />
                                    </Draggable>
                                )}
                                </Collection>
                            </Col>
                            {this.state.showCart && <Col s={6}>
                                <h5 className="light">Applicants Cart</h5>                            
                                <Droppable types={['applicant']} onDrop={this.onDrop.bind(this)}>
                                    <Collection>
                                        {this.state.applicantsCart.map(applicant =>
                                            <Applicant key={applicant.studentNumber}
                                                applicantInfo={applicant}
                                                prompt={this.isAssigned.bind(this)}
                                                courseUnderConsideration={this.state.code}
                                                toggleFunction={this.toggleCart.bind(this)}                                
                                                numTAFunction={this.incTAs.bind(this)}
                                                numberOfTAs={this.state.numberOfTAs} />
                                            )}
                                    </Collection>
                                </Droppable>
                                </Col>}                            
                        </Row>
                    </CollapsibleItem>
                </Collapsible>
                
        </CollapsibleItem>
        )
    }
}