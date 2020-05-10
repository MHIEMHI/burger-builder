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
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component
{
	state =
		{
			totalPrice: 4,
			purchasable: false,
			purchasing: false,
			loading: false,
			error: null
		};

	componentDidMount()
	{
		// axios.get("/ingredients.json")
		// 	.then(response =>
		// 	{
		// 		this.setState({ ingredients: response.data });
		// 	})
		// 	.catch(error =>
		// 	{
		// 		this.setState({ error });
		// 	});
	}

	purchaseCancelHandler = () =>
	{
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => 
	{
		const queryParams = [];
		for (let i in this.state.ingredients)
		{
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('totalPrice=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
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
		this.setState({ purchasable: sum > 0 });
	};

	addIngredientHandler = type =>
	{
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredient = {
			...this.state.ingredients
		};
		updatedIngredient[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
		this.updatePurchaseState(updatedIngredient);
	};

	removeIngredientHandler = type =>
	{
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0)
		{
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredient = {
			...this.state.ingredients
		};
		updatedIngredient[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
		this.updatePurchaseState(updatedIngredient);
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
		let burger = this.state.error ? <p>Ingredients can't be loaded! {this.state.error.message}</p> : <Spinner />;

		if (this.props.ingredients)
		{
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.state.totalPrice}
				/>
			);

			burger = (
				<Aux>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disableInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
					/>
				</Aux >
			);
		}

		if (this.state.loading)
		{
			orderSummary = <Spinner />;
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
		ingredients: state.ingredients
	});

const mapDispatchToProps = dispatch => (
	{
		onIngredientAdded: ingredientName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
		onIngredientRemoved: ingredientName => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName })
	});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));