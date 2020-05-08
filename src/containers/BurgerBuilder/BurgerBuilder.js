import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

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
			ingredients: null,
			totalPrice: 4,
			purchasable: false,
			purchasing: false,
			loading: false,
			error: null
		};

	componentDidMount()
	{
		axios.get("/ingredients.json")
			.then(response =>
			{
				this.setState({ ingredients: response.data });
			})
			.catch(error =>
			{
				this.setState({ error });
			});
	}

	purchaseCancelHandler = () =>
	{
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => 
	{
		//alert('You Continue!');
		// this.setState({ loading: true });
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customer:
		// 	{
		// 		name: 'Mehdi',
		// 		address:
		// 		{
		// 			street: 'Test street',
		// 			zipCode: '50010',
		// 			country: 'Morroco'
		// 		},
		// 		email: 'test@test.com'
		// 	},
		// 	deliveryMethod: 'fastest'
		// };
		// axios.post('/orders.json', order)
		// 	.then(response =>
		// 	{
		// 		this.setState({ loading: false, purchasing: false });
		// 	})
		// 	.catch(error =>
		// 	{
		// 		this.setState({ loading: false, purchasing: false });
		// 	});
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
			...this.state.ingredients
		};
		for (let key in disableInfo)
		{
			disableInfo[key] = disableInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded! {this.state.error.message}</p> : <Spinner />;

		if (this.state.ingredients)
		{
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.state.totalPrice}
				/>
			);

			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
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

export default withErrorHandler(BurgerBuilder, axios);