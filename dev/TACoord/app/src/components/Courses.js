import React, { Component } from 'react';
import { Row, Button, Collapsible } from "react-materialize";
import Course from './Course';

export default class Courses extends Component {
     constructor() {
        super();
        // initialize the list of courses
        this.state = {
            courses: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
     }

     componentDidMount() {
        var t = this;
        //  //get all the courses
        //  fetch('localhost:8080/getCourseList', {method: 'GET'})
        //      .then(json)
        //      .then(function(data) {
        //          // store this in the state courses to create course objects
        //          const courses = data.data;

        //          t.setState({
        //              courses: courses
        //          });
        //      })
        //      .catch(function(err) {
        //         // fetch didnt work
        //         throw err;
        //     });

        // Until then...
       t.setState({
           courses: [
               {code: "CSC108", title: "Introduction to Computer Programming", numberOfTAs: 40, qualifications: "CSC108"},
               {code: "CSC148", title: "Introduction to Computer Science", numberOfTAs: 40, qualifications: "CSC108, CSC148"},
               {code: "CSC165", title: "Mathematical Expression and Reasoning for Computer Science", numberOfTAs: 40, qualifications: "CSC165"},
               {code: "CSC207", title: "Software Design",numberOfTAs: 40, qualifications: "CSC207"},
           ]
       });
    }
   
    courseList() {
      this.state.courses.map(function(course) {
        return <Course code={course.code} title={course.title}  numberOfTAs={course.numberOfTAs}
                            qualifications={course.qualifications}/>
      });
    }

    render() {
        return (
            <Collapsible>
                {this.state.courses.map(course =>
                    <Course key={course.code}
                            code={course.code}
                            title={course.title}
                            numberOfTAs={course.numberOfTAs}
                            qualifications={course.qualifications}
                    />
                    )
                }
           </Collapsible>
        )    
    }
}