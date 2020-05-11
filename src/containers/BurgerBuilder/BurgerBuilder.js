import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component
{
	state =
		{
			purchasing: false
		};

	componentDidMount()
	{
		this.props.onInitIngredients();
	}

	purchaseCancelHandler = () =>
	{
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => 
	{
		this.props.history.push('/checkout');
	};

	purchaseHandler = () =>
	{
		this.setState({ purchasing: true });
	};

	updatePurchaseState = ingredients =>
	{
		const sum = Object.keys(ingredients)
			.map(igkey =>
			{
				return ingredients[igkey];
			})
			.reduce((sum, el) =>
			{
				return sum + el;
			}, 0);
		return sum > 0;
	};

	render()
	{
		const disableInfo = {
			...this.props.ingredients
		};
		for (let key in disableInfo)
		{
			disableInfo[key] = disableInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.props.error ? <p>Ingredients can't be loaded! {this.props.error.message}</p> : <Spinner />;

		if (this.props.ingredients)
		{
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.totalPrice}
				/>
			);

			burger = (
				<Aux>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disableInfo}
						price={this.props.totalPrice}
						purchasable={this.updatePurchaseState(this.props.ingredients)}
						ordered={this.purchaseHandler}
					/>
				</Aux >
			);
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux >
		);
	}
}

const mapStateToProps = state => (
	{
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
		error: state.error
	});

const mapDispatchToProps = dispatch => (
	{
		onIngredientAdded: ingredientName => dispatch(actionCreators.addIngredient(ingredientName)),
		onIngredientRemoved: ingredientName => dispatch(actionCreators.removeIngredient(ingredientName)),
		onInitIngredients: () => dispatch(actionCreators.initIngredients())
	});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));