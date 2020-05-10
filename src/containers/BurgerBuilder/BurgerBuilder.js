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

class BurgerBuilder extends Component
{
	state =
		{
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
		let burger = this.state.error ? <p>Ingredients can't be loaded! {this.state.error.message}</p> : <Spinner />;

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
		ingredients: state.ingredients,
		totalPrice: state.totalPrice
	});

const mapDispatchToProps = dispatch => (
	{
		onIngredientAdded: ingredientName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
		onIngredientRemoved: ingredientName => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName })
	});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));