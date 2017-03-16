import React, { Component } from 'react';
import { Button, Collapsible, CollapsibleItem } from "react-materialize";
import Course from './Course';

let utils = require('../utils.js');
let json = utils.json;
let courseCompare = utils.courseCompare; 

let coursesinCart = [];

export default class CourseSelection extends Component {
    constructor() {
        super();

        this.state = {
            courses: [],
        };

        this.componentWillMount = this.componentWillMount.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    addToCart(course) {
        coursesinCart.push(course);
    }

    removeFromCart(course) {
        var delIdx = coursesinCart.indexOf(course);
        if (delIdx > -1) {
            coursesinCart.splice(delIdx, 1);
        }
    }

    componentWillMount() {
        var t = this;
        fetch('/all-courses', { method: 'GET' })
            .then(json)
            .then(function(data) {
                const courses = data.data;
                courses.sort(courseCompare);
                t.setState({
                    courses: courses.map(function(obj){
                        return {code: obj.code, title: obj.title, inCart: false}    // TODO: inCart
                    })
                });
            })
            .catch(function(err) {
                throw err;
            });
    }
 
    render() {
        return (
            <div>
                <p> Course Selection </p>
                <Collapsible>
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
                </Collapsible>
            </div>
        );
    }
}