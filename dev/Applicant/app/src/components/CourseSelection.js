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
        console.log("Add " + course);
    }

    removeFromCart(course) {
        console.log("Remove " + course);
    }

    componentDidMount() {
        var t = this;
        /* 
        TODO: once courses API is built, implement this  fetch() 

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
                {code: "CSC108", title: "108 Title", inCart: true},
                {code: "CSC148", title: "148 Title", inCart: true},
                {code: "CSC165", title: "165 Title", inCart: true},
                {code: "CSC207", title: "207 Title", inCart: true},
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