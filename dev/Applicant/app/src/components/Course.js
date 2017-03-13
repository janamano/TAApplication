import React, { Component } from 'react';
import { Row, Button } from "react-materialize";
import CourseInfo from './CourseInfo';

export default class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inCart: props.inCart,
            expanded: false,
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
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
        
    }

    add(code) {
        this.setState({inCart: ! this.state.inCart});
        this.props.addToCart(code);
    }

    remove(code) {
        this.setState({inCart: ! this.state.inCart});
        this.props.removeFromCart(code);
    }
 
    render() {
        const { code, title } = this.props;
        let cart, hide;
        if (this.state.inCart) {
            cart =
                <Button waves='light' onClick={this.remove.bind(this, code)}>
                    {this.state.inCart ? "Remove From Cart" : "Add To Cart"}
                </Button>;
        } else {
            cart =
                <Button waves='light' onClick={this.add.bind(this, code)}>
                    {this.state.inCart ? "Remove From Cart" : "Add To Cart"}
                </Button>;
        }
        
        if (this.state.expanded) {
            hide =
                <Button waves='light' onClick={() => this.setState({expanded: ! this.state.expanded})}>
                    {this.state.expanded ? "Hide details" : "Show details"}
                </Button>
        } else {
            hide =
                <Button waves='light' onClick={() => this.setState({expanded: ! this.state.expanded})}>
                    {this.state.expanded ? "Hide details" : "Show details"}
                </Button>
        }
        
        let courseHeader =
            <div className="course-header">
                <span className="course-code">{this.props.code}: </span><span className="course-title">{this.props.title}</span>
                <br /><br/>
                {hide}{'  '}
                {cart}
            </div>;
        
        return (
            <div className="course">
                {courseHeader}
                { this.state.expanded ? <CourseInfo code={code}/>: null }
                <br/>
            </div>
        );
    }
}

Course.propTypes = {
    code: React.PropTypes.string,           // course code
    title: React.PropTypes.string,          // title (in words) of the course
    addToCart: React.PropTypes.func,        // function to add course (in parent component) for saving info
    removeFromCart: React.PropTypes.func,   // function to remove course (in parent component) for saving info
    inCart: React.PropTypes.bool            // boolean representing if this course is already in the cart
};