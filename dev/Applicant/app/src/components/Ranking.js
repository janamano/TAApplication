import React, { Component } from 'react';
import { Input } from "react-materialize";

export default class Ranking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rank: props.rank,
            applicationSubmitted: props.applicationSubmitted
        };

        this.handleRankingChange = this.handleRankingChange.bind(this);
    }

    handleRankingChange(event) {
        let newRank = Number(event.currentTarget.value);
        this.props.refreshRanks(this.state.rank, newRank, this.props.course)

        this.setState({
            rank: newRank
        })
    }
 
    render() {
        var style = {
            margin: 10
        };
        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Input disabled={this.state.applicationSubmitted} name={'rank' + this.props.course} type='radio' value='1' label='Rank 1' className='with-gap'
                       onChange={this.handleRankingChange} checked={this.state.rank === 1}
                />
                &emsp;&emsp;&emsp;
                <Input disabled={this.state.applicationSubmitted} name={'rank' + this.props.course} type='radio' value='2' label='Rank 2' className='with-gap'
                       onChange={this.handleRankingChange} checked={this.state.rank === 2}
                />
                &emsp;&emsp;&emsp;
                <Input disabled={this.state.applicationSubmitted} name={'rank' + this.props.course} type='radio' value='3' label='Rank 3' className='with-gap'
                       onChange={this.handleRankingChange} checked={this.state.rank === 3}
                />
                &emsp;&emsp;&emsp;
                <Input disabled={this.state.applicationSubmitted} name={'rank' + this.props.course} type='radio' value='4' label='Rank 4' className='with-gap'
                       onChange={this.handleRankingChange} checked={this.state.rank === 4}
                />
                &emsp;&emsp;&emsp;
                <Input disabled={this.state.applicationSubmitted} name={'rank' + this.props.course} type='radio' value='5' label='Rank 5' className='with-gap'
                       onChange={this.handleRankingChange} checked={this.state.rank === 5}
                />
            </div>
        );
    }
}