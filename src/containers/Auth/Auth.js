import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actionCreators from '../../store/actions';

class Auth extends Component
{
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					name: 'email',
					type: 'text',
					placeholder: 'Mail address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false,
				errorMessage: 'Mail is missing'
			},
			password: {
				elementType: 'input',
				elementConfig: {
					name: 'password',
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false,
				errorMessage: 'Password is missing'
			}
		},
		isSignUp: true
	};

	checkValidity = (value, rules) =>
	{
		let isValid = true;

		if (!rules)
		{
			return true;
		}

		if (rules.required)
		{
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength)
		{
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength)
		{
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail)
		{
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric)
		{
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};

	inputChangedHandler = (e) =>
	{
		const updatedControls = {
			...this.state.controls,
			[e.target.name]:
			{
				...this.state.controls[e.target.name],
				value: e.target.value,
				valid: this.checkValidity(e.target.value, this.state.controls[e.target.name].validation),
				touched: true
			}
		};

		this.setState({ controls: updatedControls });
	};

	submitHandler = (e) =>
	{
		e.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
	};

	switchAuthModeHandler = () =>
	{
		this.setState((prevState) =>
		{
			return { isSignUp: !prevState.isSignUp };
		});
	};

	render()
	{
		let formElementArray = [];
		for (let key in this.state.controls)
		{
			formElementArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = formElementArray.map(formElement => (
			<Input
				key={formElement.id}
				{...formElement.config}
				changed={this.inputChangedHandler}
			/>
		));

		return (
			<div className={classes.Auth}>
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button
					btnType="Danger"
					clicked={this.switchAuthModeHandler}
				>
					SWITCH TO SIGN {this.state.isSignUp ? 'IN' : 'UP'}
				</Button>
			</div >
		);
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
	{
		onAuth: (login, password, isSignUp) => dispatch(actionCreators.auth(login, password, isSignUp))
	});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
