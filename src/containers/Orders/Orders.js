import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component
{
	state = {
		loading: true,
		orders: []
	};
	componentDidMount()
	{
		axios.get('/orders.json')
			.then(response =>
			{
				const fetchedOrders = [];
				for (let key in response.data)
				{
					fetchedOrders.push({
						id: key,
						...response.data[key]
					});
				}
				this.setState({ orders: fetchedOrders, loading: false });
			})
			.catch(err =>
			{
				this.setState({ loading: false });
			});
	}

	render()
	{
		return (
			<div>
				{this.state.orders.map(order => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
					/>
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
