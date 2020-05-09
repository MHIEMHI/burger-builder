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
				<CounterControl label="Decrement" clicked={this.props.onIncrementCounter} />
				<CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)} />
				<CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)} />
				<hr />
				<button onClick={this.props.onStoreResult}>Store  Result</button>
				<ul>
					{
						this.props.storedResult.map(res => (
							<li key={res.id} onClick={this.props.onDeleteResult}>{res.value}</li>
						))
					}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		ctr: state.counter,
		storedResult: state.result
	});

const mapDispatchToProps = dispatch => (
	{
		onIncrementCounter: () => dispatch({
			type: 'INCREMENT'
		}),
		onDecrementCounter: () => dispatch({
			type: 'DECREMENT'
		}),
		onAddCounter: value => dispatch({
			type: 'ADD',
			value
		}),
		onSubtractCounter: value => dispatch({
			type: 'SUBTRACT',
			value
		}),
		onStoreResult: () => dispatch({
			type: 'STORE_RESULT'
		}),
		onDeleteResult: () => dispatch({
			type: 'DELETE_RESULT'
		})
	});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);