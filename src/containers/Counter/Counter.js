import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component
{
    state = {
        counter: 0
    };

    render()
    {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler('dec')} />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler('add', 5)} />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler('sub', 5)} />
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        ctr: state.counter
    });

const mapDispatchToProps = dispatch => (
    {
        onIncrementCounter: () => dispatch({
            type: 'INCREMENT'
        })
    });

export default connect(mapStateToProps, mapDispatchToProps)(Counter);