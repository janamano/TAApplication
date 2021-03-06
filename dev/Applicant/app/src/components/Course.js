import React, { Component } from 'react';
import { Row, Button, CollapsibleItem } from "react-materialize";
import CourseInfo from './CourseInfo';

export default class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inCart: props.inCart,
            expanded: false,
            applicationSubmitted: props.applicationSubmitted
        }

        this.cartEvent = this.cartEvent.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    /* 
    Function that handles when the "Add to Cart" or "Remove from Cart" buttons are clicked.
    handler is either add() (if "Add to Cart" is clicked), or remove() (if "Remove from
    Cart" is clicked)
    */
    cartEvent(event, code, handler) {
        event.stopPropagation();
        handler(code);
    }

    /*
    Function responsible for adding a course on to the cart, and setting the state which will
    allow the button's text to change to "Remove from Cart".
    Also responsible for calling the parent's component addToCart handler, which will add this
    course on to the cart for form submission.
    */
    add(code) {
        this.setState({inCart: ! this.state.inCart});
        this.props.addToCart(code);
    }
    
    /*
    Function responsible for removing a course from the cart, and setting the state which will
    allow the button's text to change to "Add to Cart".
    Also responsible for calling the parent's component addToCart handler, which will add this
    course on to the cart for form submission.
    */
    remove(code) {
        this.setState({inCart: ! this.state.inCart});
        this.props.removeFromCart(code);
    }
 
    render() {
        const { code, title } = this.props;
        let cart;
        var style = {
            textAlign: 'left',
            marginTop: '1.3%',
            marginBottom: '1.5%'
        };
        var style2 = {
            float: 'right'
        }
        if (this.state.inCart) {
            cart =
                <Button disabled={this.state.applicationSubmitted} style={style2} waves='light' onClick={(evt) => this.cartEvent(evt, code, this.remove)}>
                    {this.state.inCart ? "Remove From Cart" : "Add To Cart"}
                </Button>;
        } else {
            cart =
                <Button disabled={this.state.applicationSubmitted} style={style2} waves='light' onClick={(evt) => this.cartEvent(evt, code, this.add)}>
                    {this.state.inCart ? "Remove From Cart" : "Add To Cart"}
                </Button>;
        }
        
        let heading = 
            <span>
                <span className="course-code">
                    <b>{code}</b>
                </span>
                {": "}
                <span className="course-title">
                    {title}
                </span>
                <span>
                    {cart}
                </span>
            </span>;

        return (
            <div className="course">
                <CollapsibleItem style={style} header={heading} icon='view_agenda' >
                    <CourseInfo code={code} />
                </CollapsibleItem>
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