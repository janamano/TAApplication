import React, { Component } from 'react';
import { Input } from "react-materialize";

export default class Ranking extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
 
    render() {
        var style = {
            margin: 10
        };
        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Input name='rank' type='radio' value='1' label='Rank 1' className='with-gap'/>&emsp;&emsp;&emsp;
                <Input name='rank' type='radio' value='2' label='Rank 2' className='with-gap'/>&emsp;&emsp;&emsp;
                <Input name='rank' type='radio' value='3' label='Rank 3' className='with-gap'/>&emsp;&emsp;&emsp;
                <Input name='rank' type='radio' value='4' label='Rank 4' className='with-gap'/>&emsp;&emsp;&emsp;
                <Input name='rank' type='radio' value='5' label='Rank 5' className='with-gap'/>
            </div>
        );
    }
}