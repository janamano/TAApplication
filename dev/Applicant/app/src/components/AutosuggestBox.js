import React, { Component } from 'react';
import Select from 'react-select';

export default class AutosuggestBox extends Component {
    constructor(props) {
        super(props);

        // if we already have this information stored in the db, then
        // we pass in the applicant's history and populate. if not, then
        // the value passed in is an empty string
        this.state = {
            value: this.props.selected,
        }

        this.updateValue = this.updateValue.bind(this);
    }

    /**
     * Upon selecting an option, we update our "value" (list of chosen options) to
     * include the chosen option too. We also call the onSelectOption in the parent,
     * to log the change in the parent form (for submission)
     */
    updateValue(value) {
        this.setState({
            value: value
        });
        this.props.onSelectOption(value);
    }

    render() {
        return (
            <div className="autosuggest">
                <Select 
                    multi 
                    simpleValue 
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    options={this.props.options} 
                    onChange={this.updateValue} 
                />
            </div>
        );
    }
}

AutosuggestBox.propTypes = {
    placeholder: React.PropTypes.string,    // placeholder string in text box
    options: React.PropTypes.array,         // list of options for the autosuggest box
    selected: React.PropTypes.string,       // comma-separated list of values selected thus far
    onSelectOption: React.PropTypes.func    // function to log change in parent component (form)
};