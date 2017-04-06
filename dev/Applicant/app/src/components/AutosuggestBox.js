import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

import 'whatwg-fetch';

let utils = require('../utils.js');
let json = utils.json;
let courseCompare = utils.courseCompare; 

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
    <div>
    {suggestion}
    </div>
);

export default class AutosuggestBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
            options: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
    }

    componentWillMount() {
        var t = this;
        fetch('/all-courses', { method: 'GET' })
            .then(json)
            .then(function(data) {
                const courses = data.data;
                let coursePrefs = [];
                courses.sort(courseCompare);
                t.setState({
                    options: courses.map(function(obj){
                        return obj.code
                    })
                });
            })
            .catch(function(err) {
                throw err;
            });
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.options.filter(option =>
            option.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    /**
     * Function responsible for updating text after each keystroke on autosuggest box
     */
    onChange(event, { newValue }) {
        this.setState({
            value: newValue
        });
    };


    /**
     * On each keystroke, update the list of suggestions
     */
    onSuggestionsFetchRequested({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };


    /**
     * Function that is responsible for behaviour upon user clicking a suggestion
     */
     onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
        this.setState({
            value: ""
        });
        this.props.addCourse(suggestion);
     }


    /**
     * Function responsible for behaviour upon clearing the suggested list
     */
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: [],
        });
    };

    render() {
        const { value, suggestions } = this.state;

        // props to be sent to Autosuggest
        const inputProps = {
            placeholder: 'Search for a course',
            value,
            onChange: this.onChange
        };

        const theme = {
            container: {
                position: 'relative',
                marginLeft: "5%"
            },
            input: {
                width: 240,
                height: 30,
                padding: '10px 20px',
                fontFamily: 'Helvetica, sans-serif',
                fontWeight: 300,
                fontSize: 16,
                border: '1px solid #aaa',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                marginLeft: "38%",
                textAlign: "center"
            },
            inputFocused: {
                outline: 'none'
            },
            inputOpen: {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
            },
            suggestionsContainer: {
                display: 'none'
            },
            suggestionsContainerOpen: {
                display: 'block',
                position: 'absolute',
                top: 51,
                width: 280,
                border: '1px solid #aaa',
                backgroundColor: '#fff',
                fontFamily: 'Helvetica, sans-serif',
                fontWeight: 300,
                fontSize: 16,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                zIndex: 2,
                marginLeft: "38%",
                textAlign: "center"
            },
            suggestionsList: {
                margin: 0,
                padding: 0,
                listStyleType: 'none',
            },
            suggestion: {
                cursor: 'pointer',
                padding: '10px 20px'
            },
            suggestionHighlighted: {
                backgroundColor: '#ddd'
            }
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={theme}
            />        
        );
    }
}