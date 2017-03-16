import React, { Component } from 'react';
import { Input } from "react-materialize";

export default class Ranking extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
 
    render() {
        return (
            <div>
                <Input s={1} type='select' defaultValue='1'>
                    <option value='1'>Rank 1</option>
                    <option value='2'>Rank 2</option>
                    <option value='3'>Rank 3</option>
                    <option value='4'>Rank 4</option>
                    <option value='5'>Rank 5</option>
                </Input>
            </div>
        );
    }
}