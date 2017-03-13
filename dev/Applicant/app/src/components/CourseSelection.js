import React, { Component } from 'react';
import Course from './Course';

let coursesinCart = [];

export default class CourseSelection extends Component {
    constructor() {
        super();

        this.state = {
            courses: [],
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    addToCart(course) {
        coursesinCart.push(course)
    }

    removeFromCart(course) {
        var delIdx = coursesinCart.indexOf(course);
        if (delIdx > -1) {
            coursesinCart.splice(delIdx, 1);
        }
    }

    componentDidMount() {
        var t = this;
        /* 
        TODO: once courses API is built, implement this fetch() 

        fetch('/all-courses', { method: 'GET' })
            .then(json)
            .then(function(data) {
                const courses = data.data;
                t.setState({
                    courses: courses
                });
            })
            .catch(function(err) {
                // Error :(
                throw err;
            });
        */

        // Until then...
        t.setState({
            courses: [
                {code: "CSC108", title: "Introduction to Computer Programming", inCart: false},
                {code: "CSC148", title: "Introduction to Computer Science", inCart: false},
                {code: "CSC165", title: "Mathematical Expression and Reasoning for Computer Science", inCart: false},
                {code: "CSC207", title: "Software Design", inCart: false},
            ]
        });
    }
 
    render() {
        return (
            <div>
                <p> Course Selection </p>
                <ul>
                    {this.state.courses.map(course =>
                        <Course key={course.code} 
                                code={course.code} 
                                title={course.title}
                                addToCart={this.addToCart}
                                removeFromCart={this.removeFromCart}
                                inCart={course.inCart}
                        />
                        )
                    }
                </ul>
            </div>
        );
    }
}